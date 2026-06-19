/*
 * =====================================================
 * GreenRoots NPO - Main JavaScript File
 * File: js/main.js
 * Author: [Student Name]
 * Date: February 2026
 * Description: JavaScript functionality for GreenRoots NPO website.
 *              Includes mobile navigation, form validation, and
 *              homepage count-up animations.
 * =====================================================
 */

(function () {
    'use strict';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\s-]{10,15}$/;

    const select = (selector, root = document) => root.querySelector(selector);
    const selectAll = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setActiveNavLink = () => {
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        selectAll('#main-nav a').forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href === currentFile) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    const setupMobileNavigation = () => {
        const hamburger = select('#hamburger');
        const nav = select('#main-nav');
        if (!hamburger || !nav) {
            return;
        }

        const setNavState = (isOpen) => {
            if (isOpen) {
                nav.classList.add('open');
                hamburger.setAttribute('aria-expanded', 'true');
            } else {
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        };

        hamburger.addEventListener('click', () => {
            setNavState(!nav.classList.contains('open'));
        });

        selectAll('#main-nav a').forEach((navLink) => {
            navLink.addEventListener('click', () => {
                setNavState(false);
            });
        });
    };

    const animateCountUp = () => {
        const counters = selectAll('.count-up');
        if (!counters.length) {
            return;
        }

        const animate = (counter) => {
            const target = Number(counter.dataset.target || 0);
            if (Number.isNaN(target) || target <= 0) {
                counter.textContent = '0';
                return;
            }

            let current = 0;
            const duration = 1400;
            const frameRate = 30;
            const step = Math.max(1, Math.round((target * frameRate) / duration));

            const update = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toString();
                    return;
                }
                counter.textContent = current.toString();
                window.requestAnimationFrame(update);
            };

            update();
        };

        if (hasReducedMotion) {
            counters.forEach((counter) => {
                counter.textContent = counter.dataset.target || '0';
            });
            return;
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries, intersectionObserver) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animate(entry.target);
                            intersectionObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            counters.forEach((counter) => observer.observe(counter));
        } else {
            counters.forEach(animate);
        }
    };

    const getErrorElement = (fieldOrId) => {
        if (!fieldOrId) {
            return null;
        }

        if (typeof fieldOrId === 'string') {
            return document.getElementById(fieldOrId);
        }

        const fieldId = fieldOrId.id || fieldOrId.name;
        if (fieldId) {
            const errorElement = document.getElementById(`${fieldId}-error`);
            if (errorElement) {
                return errorElement;
            }
        }

        return fieldOrId.closest('.form-group')?.querySelector('.field-error') || null;
    };

    const showError = (fieldOrId, message) => {
        const errorElement = getErrorElement(fieldOrId);
        if (errorElement) {
            errorElement.textContent = message;
        }

        if (typeof fieldOrId !== 'string' && fieldOrId instanceof HTMLElement) {
            fieldOrId.classList.add('invalid');
        }
    };

    const clearError = (fieldOrId) => {
        const errorElement = getErrorElement(fieldOrId);
        if (errorElement) {
            errorElement.textContent = '';
        }

        if (typeof fieldOrId !== 'string' && fieldOrId instanceof HTMLElement) {
            fieldOrId.classList.remove('invalid');
        }
    };

    const clearFormErrors = (form) => {
        if (!form) {
            return;
        }

        selectAll('.field-error', form).forEach((errorElement) => {
            errorElement.textContent = '';
        });

        selectAll('.invalid', form).forEach((field) => {
            field.classList.remove('invalid');
        });
    };

    const updateCharacterCount = (textarea, counter, maxLength) => {
        if (!textarea || !counter) {
            return;
        }

        const valueLength = textarea.value.length;
        counter.textContent = `${valueLength} / ${maxLength} characters`;
    };

    const closeModal = () => {
        const overlay = select('#modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    const setAuthTab = (tabName) => {
        const authForms = selectAll('.auth-form');
        const modalTabs = selectAll('.modal-tab');
        const modalTitle = select('#modal-title');

        authForms.forEach((form) => {
            form.classList.toggle('active', form.dataset.authTab === tabName);
        });

        modalTabs.forEach((tab) => {
            tab.classList.toggle('active', tab.dataset.authTab === tabName);
        });

        if (modalTitle) {
            modalTitle.textContent =
                tabName === 'register'
                    ? 'Create a GreenRoots Account'
                    : tabName === 'forgot'
                    ? 'Reset Your Password'
                    : 'Login to GreenRoots';
        }
    };

    const setupAuthModals = () => {
        const overlay = select('#modal-overlay');
        const openButtons = selectAll('.modal-open');
        const closeButtons = selectAll('.modal-close');
        const modalTabs = selectAll('.modal-tab');
        const forgotLinks = selectAll('.auth-forgot-link');
        const backLinks = selectAll('.auth-back-to-login');

        if (!overlay) {
            return;
        }

        openButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const modalName = button.dataset.modal?.replace('-modal', '') || 'login';
                setAuthTab(modalName);
                overlay.classList.add('active');
            });
        });

        closeButtons.forEach((button) => {
            button.addEventListener('click', closeModal);
        });

        modalTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                setAuthTab(tab.dataset.authTab);
            });
        });

        forgotLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                setAuthTab('forgot');
            });
        });

        backLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                setAuthTab('login');
            });
        });

        // Close modal when clicking any cancel button inside modal footers
        const cancelButtons = selectAll('.modal-footer .btn-secondary');
        cancelButtons.forEach((btn) => btn.addEventListener('click', closeModal));

        // Helper: show/clear messages inside modal
        const ensureMessageContainer = () => {
            const modal = select('.modal');
            if (!modal) return null;
            let container = select('.modal-message', modal);
            if (!container) {
                container = document.createElement('div');
                container.className = 'modal-message';
                modal.insertBefore(container, modal.firstChild);
            }
            return container;
        };

        const showAuthMessage = (type, text) => {
            const container = ensureMessageContainer();
            if (!container) return;
            container.textContent = text;
            container.classList.remove('success', 'error');
            container.classList.add(type === 'error' ? 'error' : 'success');
        };

        const clearAuthMessages = () => {
            const container = select('.modal-message');
            if (container) {
                container.textContent = '';
                container.className = 'modal-message';
                container.style.display = '';
            }
        };

        // Enhanced client-side submit handling for auth forms (no backend)
        const authForms = selectAll('.auth-form');
        authForms.forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                clearAuthMessages();

                // Use browser native validation where available
                if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                // Register flow: validate and then redirect to login tab
                if (form.id === 'register-form') {
                    const email = select('#register-email', form)?.value.trim();
                    const pwd = select('#register-password', form)?.value || '';
                    const pwdc = select('#register-password-confirm', form)?.value || '';

                    if (pwd.length < 6) {
                        showAuthMessage('error', 'Password must be at least 6 characters.');
                        return;
                    }

                    if (pwd !== pwdc) {
                        showAuthMessage('error', 'Passwords do not match.');
                        return;
                    }

                    showAuthMessage('success', 'Registration successful — redirecting to login...');

                    setTimeout(() => {
                        // switch to login tab and prefill email
                        setAuthTab('login');
                        const loginEmail = select('#login-email');
                        if (loginEmail && email) loginEmail.value = email;
                        // clear register form
                        form.reset();
                        clearFormErrors(form);

                        // show a short instructional message in login
                        showAuthMessage('success', 'Please login with your new credentials.');
                    }, 1100);

                    return;
                }

                // Login flow: simple client-side check
                if (form.id === 'login-form') {
                    const email = select('#login-email', form)?.value.trim() || '';
                    const pwd = select('#login-password', form)?.value || '';

                    if (!validateEmail(email) || pwd.length < 4) {
                        showAuthMessage('error', 'Invalid email or password.');
                        return;
                    }

                    showAuthMessage('success', 'Login successful — closing...');
                    setTimeout(() => {
                        closeModal();
                        form.reset();
                        clearFormErrors(form);
                    }, 900);

                    return;
                }

                // Forgot password flow: simulate sending link
                if (form.id === 'forgot-form') {
                    const email = select('#forgot-email', form)?.value.trim() || '';
                    if (!validateEmail(email)) {
                        showAuthMessage('error', 'Please enter a valid email to receive a reset link.');
                        return;
                    }

                    showAuthMessage('success', 'A password reset link has been sent to your email (simulated).');
                    setTimeout(() => {
                        setAuthTab('login');
                    }, 1400);
                }
            });
        });

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('active')) {
                closeModal();
            }
        });
    };

    const validateEmail = (value) => emailPattern.test(value.trim());
    const validatePhone = (value) => phonePattern.test(value.trim());

    const validateContactForm = (form) => {
        if (!form) {
            return null;
        }

        clearFormErrors(form);

        const nameField = select('#contact-name', form);
        const emailField = select('#contact-email', form);
        const subjectField = select('#subject', form);
        const messageTypeField = select('#message-type', form);
        const messageField = select('#contact-message', form);

        let isValid = true;

        if (!nameField || nameField.value.trim().length < 2) {
            showError(nameField, 'Please enter your full name (at least 2 characters).');
            isValid = false;
        }

        if (!emailField || !validateEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!subjectField || subjectField.value.trim().length === 0) {
            showError(subjectField, 'Please enter a subject for your message.');
            isValid = false;
        }

        if (!messageTypeField || !messageTypeField.value) {
            showError(messageTypeField, 'Please select the type of message.');
            isValid = false;
        }

        if (!messageField || messageField.value.trim().length < 20) {
            showError(messageField, 'Please enter a message with at least 20 characters.');
            isValid = false;
        } else if (messageField.value.trim().length > 2000) {
            showError(messageField, 'Your message must be 2,000 characters or fewer.');
            isValid = false;
        }

        return isValid
            ? {
                  name: nameField.value.trim(),
                  email: emailField.value.trim(),
                  subject: subjectField.value.trim(),
                  messageType: messageTypeField.value,
                  message: messageField.value.trim(),
              }
            : null;
    };

    const buildMailtoLink = (data) => {
        const subject = `GreenRoots NPO enquiry: ${data.subject}`;
        const bodyLines = [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Message Type: ${data.messageType}`,
            '',
            data.message,
        ];

        const body = bodyLines.join('\r\n');
        return `mailto:info@greenrootsnpo.org.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleContactForm = () => {
        const form = select('#contact-form');
        if (!form) {
            return;
        }

        const successMessage = select('#contact-success');
        const messageField = select('#contact-message', form);
        const messageCounter = select('#contact-message-count', form);
        const resetButton = select('#contact-reset', form);

        if (messageField && messageCounter) {
            updateCharacterCount(messageField, messageCounter, messageField.maxLength || 2000);
            messageField.addEventListener('input', () => {
                updateCharacterCount(messageField, messageCounter, messageField.maxLength || 2000);
                clearError(messageField);
            });
        }

        selectAll('input, select, textarea', form).forEach((field) => {
            field.addEventListener('input', () => {
                clearError(field);
            });
            field.addEventListener('change', () => {
                clearError(field);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = validateContactForm(form);
            if (!formData) {
                const firstInvalid = select('.invalid', form);
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                return;
            }

            const mailtoLink = buildMailtoLink(formData);
            window.location.href = mailtoLink;

            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            form.reset();
            if (messageField && messageCounter) {
                updateCharacterCount(messageField, messageCounter, messageField.maxLength || 2000);
            }
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                clearFormErrors(form);
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
                if (messageField && messageCounter) {
                    setTimeout(() => {
                        updateCharacterCount(messageField, messageCounter, messageField.maxLength || 2000);
                    }, 0);
                }
            });
        }
    };

    const validateEnquiryForm = (form) => {
        if (!form) {
            return null;
        }

        clearFormErrors(form);

        const nameField = select('#full-name', form);
        const emailField = select('#email', form);
        const phoneField = select('#phone', form);
        const enquiryTypeField = select('#enquiry-type', form);
        const referralRadios = selectAll('input[name="referral_source"]', form);
        const messageField = select('#message', form);
        const consentField = select('#popia-consent', form);

        let isValid = true;

        if (!nameField || nameField.value.trim().length < 2) {
            showError(nameField, 'Please enter your full name (at least 2 characters).');
            isValid = false;
        }

        if (!emailField || !validateEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!phoneField || !validatePhone(phoneField.value)) {
            showError(phoneField, 'Please enter a valid phone number (numbers, spaces, +, or -).');
            isValid = false;
        }

        if (!enquiryTypeField || !enquiryTypeField.value) {
            showError(enquiryTypeField, 'Please select the type of enquiry.');
            isValid = false;
        }

        const referralSelected = referralRadios.some((radio) => radio.checked);
        if (!referralSelected) {
            showError('referral-error', 'Please tell us how you heard about GreenRoots NPO.');
            isValid = false;
        }

        if (!messageField || messageField.value.trim().length < 20) {
            showError(messageField, 'Please provide more information (at least 20 characters).');
            isValid = false;
        } else if (messageField.value.trim().length > 1000) {
            showError(messageField, 'Your message must be 1,000 characters or fewer.');
            isValid = false;
        }

        if (!consentField || !consentField.checked) {
            showError(consentField, 'You must consent to POPIA data processing to submit this enquiry.');
            isValid = false;
        }

        return isValid
            ? {
                  fullName: nameField.value.trim(),
                  email: emailField.value.trim(),
                  phone: phoneField.value.trim(),
                  organisation: select('#organisation', form)?.value.trim() || '',
                  enquiryType: enquiryTypeField.value,
                  locationPreference: select('#location-preference', form)?.value || '',
                  availability: selectAll('input[name="availability"]:checked', form).map((checkbox) => checkbox.value),
                  referralSource: referralRadios.find((radio) => radio.checked)?.value || '',
                  message: messageField.value.trim(),
              }
            : null;
    };

    const handleEnquiryForm = () => {
        const form = select('#enquiry-form');
        if (!form) {
            return;
        }

        const successMessage = select('#enquiry-success');
        const messageField = select('#message', form);
        const messageCounter = select('#message-count', form);
        const resetButton = select('#enquiry-reset', form);

        if (messageField && messageCounter) {
            updateCharacterCount(messageField, messageCounter, messageField.maxLength || 1000);
            messageField.addEventListener('input', () => {
                updateCharacterCount(messageField, messageCounter, messageField.maxLength || 1000);
                clearError(messageField);
            });
        }

        selectAll('input, select, textarea', form).forEach((field) => {
            field.addEventListener('input', () => {
                clearError(field);
            });
            field.addEventListener('change', () => {
                clearError(field);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = validateEnquiryForm(form);
            if (!formData) {
                const firstInvalid = select('.invalid', form);
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                return;
            }

            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            form.reset();
            clearFormErrors(form);

            if (messageField && messageCounter) {
                updateCharacterCount(messageField, messageCounter, messageField.maxLength || 1000);
            }
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                clearFormErrors(form);
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
                if (messageField && messageCounter) {
                    setTimeout(() => {
                        updateCharacterCount(messageField, messageCounter, messageField.maxLength || 1000);
                    }, 0);
                }
            });
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        setupMobileNavigation();
        setActiveNavLink();
        animateCountUp();
        handleContactForm();
        handleEnquiryForm();
        setupAuthModals();
    });
})();

