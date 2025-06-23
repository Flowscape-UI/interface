import type { CardType } from "../types/payment-form"

export const detectCardType = (number: string): CardType => {
  const num = number.replace(/\s/g, "")

  if (/^4/.test(num)) return { type: "visa", color: "#1a1f71", name: "Visa" }
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/.test(num))
    return { type: "mastercard", color: "#eb001b", name: "Mastercard" }
  if (/^3[47]/.test(num)) return { type: "amex", color: "#016fd0", name: "American Express" }
  if (/^6(011|5|22[126-925])/.test(num)) return { type: "discover", color: "#ff6000", name: "Discover" }
  if (/^35(2[89]|[3-8][0-9])/.test(num)) return { type: "jcb", color: "#0c4b8e", name: "JCB" }
  if (/^62/.test(num)) return { type: "unionpay", color: "#045aa7", name: "UnionPay" }
  if (/^(30[0-5]|36|38|39)/.test(num)) return { type: "diners", color: "#888", name: "Diners Club" }
  if (/^220[01]/.test(num)) return { type: "mir", color: "#39b54a", name: "МИР" }

  return { type: "", color: "#3a7bd5", name: "Unknown" }
}

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  let formatted = ""

  for (let i = 0; i < cleaned.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " "
    formatted += cleaned[i]
  }

  return formatted
}

export const formatDisplayCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "")
  let displayed = ""

  for (let i = 0; i < 16; i++) {
    displayed += i < cleaned.length ? cleaned[i] : "•"
    if ((i + 1) % 4 === 0 && i !== 15) displayed += " "
  }

  return displayed || "•••• •••• •••• ••••"
}

export const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/[^0-9]/g, "")

  if (cleaned.length > 2) {
    const month = Number.parseInt(cleaned.substring(0, 2), 10)
    const year = Number.parseInt(cleaned.substring(2, 4), 10)
    return `${Math.min(month, 12).toString().padStart(2, "0")}/${year > 38 ? "38" : year.toString().padStart(2, "0")}`
  }

  return cleaned.substring(0, 2)
}

export const transliterate = (text: string): string => {
  const translitMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ъ: "'",
    Ы: "Y",
    Ь: "'",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  }

  return text
    .split("")
    .map((char) => translitMap[char] || char)
    .join("")
}

export const getCardTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    discover: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
    jcb: "https://upload.wikimedia.org/wikipedia/commons/1/1b/JCB_logo.svg",
    unionpay: "https://upload.wikimedia.org/wikipedia/commons/3/35/UnionPay_logo.svg",
    diners: "https://upload.wikimedia.org/wikipedia/commons/2/26/Diners_Club_International_logo.svg",
    mir: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg",
  }

  return icons[type] || ""
}
