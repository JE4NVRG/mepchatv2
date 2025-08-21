// Google Analytics 4
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  gtag('event', eventName, parameters);
};

export const trackPageView = (pagePath: string) => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: pagePath,
  });
};

// Meta Pixel
export const fbq = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq(...args);
  }
};

export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
  fbq('track', eventName, parameters);
};

// Hotjar
export const hj = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    (window as any).hj(...args);
  }
};

export const trackHotjarEvent = (eventName: string) => {
  hj('event', eventName);
};

// Combined tracking functions
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
  trackFacebookEvent('Lead', {
    content_name: ctaName,
    content_category: 'CTA',
  });
  trackHotjarEvent(`cta_${ctaName.toLowerCase().replace(/\s+/g, '_')}`);
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
  
  if (success) {
    trackFacebookEvent('CompleteRegistration', {
      content_name: formName,
    });
    trackHotjarEvent(`form_${formName.toLowerCase().replace(/\s+/g, '_')}_success`);
  }
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
  trackHotjarEvent(`section_${sectionName.toLowerCase().replace(/\s+/g, '_')}_view`);
};