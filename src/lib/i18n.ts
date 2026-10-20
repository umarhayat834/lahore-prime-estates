export type Locale = "en" | "ur";

export const locales: Locale[] = ["en", "ur"];

/**
 * Only the navigation, hero and primary call-to-action are offered in Urdu, so
 * the toggle stays honest instead of pretending the whole catalogue is
 * translated. Urdu switches the reading direction to right-to-left.
 */
export const copy = {
  nav: {
    en: {
      home: "Home",
      properties: "Properties",
      areas: "Areas",
      services: "Services",
      about: "About",
      contact: "Contact",
      whatsapp: "WhatsApp Us",
      menu: "Open menu",
      close: "Close menu",
    },
    ur: {
      home: "ہوم",
      properties: "پراپرٹی",
      areas: "علاقے",
      services: "سروسز",
      about: "ہمارے بارے میں",
      contact: "ربط",
      whatsapp: "واٹس ایپ",
      menu: "مینو کھولیں",
      close: "مینو بند کریں",
    },
  },
  hero: {
    en: {
      eyebrow: "Lahore · DHA · Bahria Town · Gulberg",
      title: "Find Your Dream Property in Lahore",
      subtitle:
        "Verified houses, apartments, plots and commercial floors — priced on real registered transactions and handled end to end.",
      search: "Search Property",
      cta: "Talk to a Consultant",
    },
    ur: {
      eyebrow: "لاہور · ڈی ایچ اے · بہریہ ٹاؤن · گلبرگ",
      title: "لاہور میں اپنی پسند کی پراپرٹی تلاش کریں",
      subtitle:
        "تصدیق شدہ گھر، اپارٹمنٹ، پلاٹ اور کمرشل فلور — حقیقی رجسٹرڈ لین دین کی بنیاد پر قیمت کے ساتھ۔",
      search: "پراپرٹی تلاش کریں",
      cta: "مشیر سے بات کریں",
    },
  },
  cta: {
    en: {
      title: "Ready to make a move in Lahore?",
      body: "Tell us the area, size and budget. We will send you verified options the same day — with documents already checked.",
      primary: "WhatsApp Us Now",
      secondary: "Email Us",
    },
    ur: {
      title: "لاہور میں پراپرٹی خریدنے یا بیچنے کا سوچ رہے ہیں؟",
      body: "علاقہ، سائز اور بجٹ بتائیں۔ اسی دن دستاویزات سمیت تصدیق شدہ آپشنز بھیجیں گے۔",
      primary: "ابھی واٹس ایپ کریں",
      secondary: "ای میل بھیجیں",
    },
  },
};

export type CopyGroup = keyof typeof copy;
/** Keys shared by the navigation labels, used by `navLinks`. */
export type CopyKey = keyof (typeof copy)["nav"]["en"];

export const dirFor = (locale: Locale) => (locale === "ur" ? "rtl" : "ltr");
