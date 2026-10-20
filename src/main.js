const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const header = document.querySelector('.site-header');
const year = document.querySelector('#current-year');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (
      navigation.classList.contains('is-open') &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -35px 0px' },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const donationDialog = document.querySelector('#donation-dialog');

if (donationDialog instanceof HTMLDialogElement) {
  const amountInput = document.querySelector('#donation-custom-amount');
  const amountError = document.querySelector('#donation-amount-error');
  const dataError = document.querySelector('#donation-data-error');
  const donorName = document.querySelector('#donor-name');
  const donorEmail = document.querySelector('#donor-email');
  const donorTaxId = document.querySelector('#donor-tax-id');
  const donationMessage = document.querySelector('#donation-message');
  const projectContext = document.querySelector('#donation-project-context');
  const donationSummary = document.querySelector('#donation-summary');
  const finalSummary = document.querySelector('#donation-final-summary');
  const pixPayloadInput = document.querySelector('#pix-payload');
  const pixKeyCard = document.querySelector('#pix-key-card');
  const alternativePayment = document.querySelector('#alternative-payment');
  const paymentDisclaimer = document.querySelector('#donation-disclaimer');
  const reportPaymentButton = document.querySelector('#report-pix-payment');
  const paymentPendingMessage = document.querySelector('#payment-pending-message');
  const copyFeedback = document.querySelector('#pix-copy-feedback');
  const quickAmounts = [...donationDialog.querySelectorAll('[data-donation-amount]')];
  const steps = [...donationDialog.querySelectorAll('[data-donation-step]')];
  const indicators = [...donationDialog.querySelectorAll('[data-step-indicator]')];
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  let selectedAmount = 30;
  let customAmountSelected = false;

  const formatCurrency = (amount) => currency.format(amount);

  const buildPixPayload = (amount) => {
    const field = (tag, value) => `${tag}${String(value.length).padStart(2, '0')}${value}`;
    const pixAccount = field('00', 'BR.GOV.BCB.PIX') + field('01', 'institutopazbem@gmail.com');
    const additionalData = field('05', '***');
    const payloadWithoutCrc = [
      field('00', '01'),
      field('26', pixAccount),
      field('52', '0000'),
      field('53', '986'),
      field('54', amount.toFixed(2)),
      field('58', 'BR'),
      field('59', 'INSTITUTO SEMEAR PAZ E BEM'),
      field('60', 'CURITIBA'),
      field('62', additionalData),
      '6304',
    ].join('');

    let crc = 0xffff;
    for (const byte of new TextEncoder().encode(payloadWithoutCrc)) {
      crc ^= byte << 8;
      for (let bit = 0; bit < 8; bit += 1) {
        crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
      }
    }

    return `${payloadWithoutCrc}${crc.toString(16).toUpperCase().padStart(4, '0')}`;
  };

  const formatTaxId = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    if (digits.length <= 11) {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    }
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    }
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  };

  const isValidTaxId = (value) => {
    const digits = value.replace(/\D/g, '');
    if (![11, 14].includes(digits.length) || /^(\d)\1+$/.test(digits)) return false;

    const calculateDigit = (base, weights) => {
      const sum = [...base].reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    if (digits.length === 11) {
      const first = calculateDigit(digits.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
      const second = calculateDigit(digits.slice(0, 10), [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
      return first === Number(digits[9]) && second === Number(digits[10]);
    }

    const first = calculateDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const second = calculateDigit(digits.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return first === Number(digits[12]) && second === Number(digits[13]);
  };

  const getFrequency = () => donationDialog.querySelector('input[name="donation-frequency"]:checked')?.value ?? 'once';
  const getPaymentMethod = () => donationDialog.querySelector('input[name="payment-method"]:checked')?.value ?? 'pix';
  const getDonationAmount = () => {
    const customValue = amountInput.value.trim();
    if (customAmountSelected && !customValue) return null;
    const amount = customAmountSelected ? Number(customValue) : selectedAmount;
    if (!Number.isFinite(amount) || amount < 1 || amount > 1000000) return null;
    return Math.round(amount * 100) / 100;
  };

  const makeSummary = () => {
    const frequency = getFrequency() === 'monthly' ? 'Doação mensal manual' : 'Doação única';
    return `${frequency} · ${formatCurrency(getDonationAmount())} · Fundo Geral do Instituto Semear`;
  };

  const updateStep = (step) => {
    steps.forEach((panel) => {
      panel.hidden = Number(panel.dataset.donationStep) !== step;
    });
    indicators.forEach((indicator) => {
      const indicatorStep = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle('is-current', indicatorStep === step);
      indicator.classList.toggle('is-complete', indicatorStep < step);
      if (indicatorStep === step) indicator.setAttribute('aria-current', 'step');
      else indicator.removeAttribute('aria-current');
    });
    donationMessage.textContent = '';
    donationDialog.querySelector(`[data-donation-step="${step}"] h3`)?.focus();
  };

  const clearDonationDetails = () => {
    donorName.value = '';
    donorEmail.value = '';
    donorTaxId.value = '';
    donorTaxId.setCustomValidity('');
    amountInput.value = '';
    donationDialog.querySelector('input[name="donation-frequency"][value="once"]').checked = true;
    donationDialog.querySelector('input[name="payment-method"][value="pix"]').checked = true;
    quickAmounts.forEach((button) => {
      const isSelected = button.dataset.donationAmount === '30';
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    selectedAmount = 30;
    customAmountSelected = false;
    amountError.textContent = '';
    dataError.textContent = '';
    donationMessage.textContent = '';
    copyFeedback.textContent = '';
    projectContext.hidden = true;
    paymentPendingMessage.hidden = true;
    reportPaymentButton.disabled = false;
    reportPaymentButton.textContent = 'Já fiz a transferência';
    updateStep(1);
  };

  document.querySelectorAll('[data-donation-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const project = button.dataset.donationProject ?? '';
      projectContext.hidden = !project;
      projectContext.textContent = project
        ? `Você chegou pelo projeto ${project}. A contribuição desta etapa será destinada ao Fundo Geral do Instituto Semear, não exclusivamente a este projeto.`
        : '';
      updateStep(1);
      donationDialog.showModal();
    });
  });

  donationDialog.querySelectorAll('[data-donation-close]').forEach((button) => {
    button.addEventListener('click', () => donationDialog.close());
  });

  donationDialog.addEventListener('close', clearDonationDetails);

  quickAmounts.forEach((button) => {
    button.addEventListener('click', () => {
      selectedAmount = Number(button.dataset.donationAmount);
      customAmountSelected = false;
      amountInput.value = '';
      amountError.textContent = '';
      quickAmounts.forEach((option) => {
        const isSelected = option === button;
        option.classList.toggle('is-selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
      });
    });
  });

  amountInput.addEventListener('input', () => {
    customAmountSelected = true;
    amountError.textContent = '';
    quickAmounts.forEach((button) => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-pressed', 'false');
    });
  });

  donationDialog.querySelector('[data-donation-next="1"]').addEventListener('click', () => {
    const amount = getDonationAmount();
    if (amount === null) {
      amountError.textContent = 'Informe um valor entre R$ 1,00 e R$ 1.000.000,00.';
      amountInput.focus();
      if (!amountInput.value.trim()) quickAmounts.find((button) => button.classList.contains('is-selected'))?.focus();
      return;
    }
    donationSummary.textContent = makeSummary();
    updateStep(2);
  });

  donationDialog.querySelector('[data-donation-back="2"]').addEventListener('click', () => updateStep(1));
  donationDialog.querySelector('[data-donation-back="3"]').addEventListener('click', () => updateStep(2));

  donorTaxId.addEventListener('input', () => {
    const cursorAtEnd = donorTaxId.selectionStart === donorTaxId.value.length;
    donorTaxId.value = formatTaxId(donorTaxId.value);
    donorTaxId.setCustomValidity('');
    dataError.textContent = '';
    if (cursorAtEnd) donorTaxId.setSelectionRange(donorTaxId.value.length, donorTaxId.value.length);
  });

  donationDialog.querySelector('[data-donation-next="2"]').addEventListener('click', () => {
    donorName.setCustomValidity(donorName.value.trim() ? '' : 'Informe seu nome completo.');
    const validTaxId = isValidTaxId(donorTaxId.value);
    donorTaxId.setCustomValidity(validTaxId ? '' : 'Informe um CPF ou CNPJ válido.');
    const requiredFields = [donorName, donorEmail, donorTaxId];
    const firstInvalid = requiredFields.find((field) => !field.checkValidity());
    if (firstInvalid) {
      dataError.textContent = 'Confira os campos obrigatórios. O CPF/CNPJ deve ser válido.';
      firstInvalid.reportValidity();
      firstInvalid.focus();
      return;
    }

    const amount = getDonationAmount();
    if (amount === null) {
      donationMessage.textContent = 'O valor informado não é válido. Volte e confira a quantia.';
      updateStep(1);
      return;
    }
    const method = getPaymentMethod();
    const methodLabel = { pix: 'PIX', card: 'Cartão', boleto: 'Boleto' }[method];
    finalSummary.textContent = `${makeSummary()} · Método: ${methodLabel}`;
    pixKeyCard.hidden = method !== 'pix';
    alternativePayment.hidden = method === 'pix';
    reportPaymentButton.hidden = method !== 'pix';
    paymentPendingMessage.hidden = true;

    const isMonthly = getFrequency() === 'monthly';
    if (method === 'pix') {
      pixPayloadInput.value = buildPixPayload(amount);
      document.querySelector('#donation-confirm-title').textContent = isMonthly
        ? 'Contribua mensalmente pelo PIX'
        : 'Finalize pelo app do seu banco';
      paymentDisclaimer.textContent = isMonthly
        ? 'O PIX não será cobrado automaticamente todo mês. Para manter sua contribuição mensal, faça a transferência manualmente a cada mês. Confira o destinatário no app do banco. Este site não recebe confirmação automática.'
        : 'Abra o app do seu banco, use a chave ou o código PIX acima, confira o destinatário antes de pagar e conclua a transferência. Este site não recebe confirmação automática.';
    } else {
      document.querySelector('#donation-confirm-title').textContent = `Solicite instruções para pagar por ${methodLabel.toLowerCase()}`;
    }

    updateStep(3);
  });

  const copyText = async (value) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = value;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand('copy');
    temporaryInput.remove();
    if (!copied) throw new Error('Clipboard access is unavailable.');
  };

  document.querySelector('#copy-pix-key').addEventListener('click', async () => {
    try {
      await copyText(document.querySelector('#pix-key').textContent.trim());
      copyFeedback.textContent = 'Chave PIX copiada.';
    } catch {
      copyFeedback.textContent = 'Não foi possível copiar. Selecione e copie a chave manualmente.';
    }
  });

  document.querySelector('#copy-pix-payload').addEventListener('click', async () => {
    try {
      await copyText(pixPayloadInput.value);
      copyFeedback.textContent = 'Código PIX copiado.';
    } catch {
      copyFeedback.textContent = 'Não foi possível copiar. Selecione e copie o código manualmente.';
      pixPayloadInput.focus();
      pixPayloadInput.select();
    }
  });

  reportPaymentButton.addEventListener('click', () => {
    paymentPendingMessage.hidden = false;
    reportPaymentButton.disabled = true;
    reportPaymentButton.textContent = 'Transferência informada';
  });
}
