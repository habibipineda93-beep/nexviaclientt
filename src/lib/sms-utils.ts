// SMS character detection utilities

const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u;

export function hasEmojis(text: string): boolean {
  return EMOJI_REGEX.test(text);
}

export function getMaxChars(text: string): number {
  return hasEmojis(text) ? 70 : 160;
}

export function getSmsParts(text: string): number {
  const max = getMaxChars(text);
  if (text.length <= max) return 1;
  // Multipart: 67 chars per part for emoji (UCS-2), 153 for standard (GSM-7)
  const partSize = hasEmojis(text) ? 67 : 153;
  return Math.ceil(text.length / partSize);
}

export const COST_PER_SMS = 10; // $10 COP per message

export function calculateCost(text: string, recipients: number): number {
  const parts = getSmsParts(text);
  return parts * recipients * COST_PER_SMS;
}

// Popular emoji categories for picker
export const EMOJI_CATEGORIES = [
  {
    name: "Caras",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥵", "🥶", "🥴", "😵", "🤯", "😎", "🥸", "😕", "😟", "🙁", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱"],
  },
  {
    name: "Manos",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
  },
  {
    name: "Objetos",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "⭐", "🌟", "✨", "💫", "🔥", "💥", "🎉", "🎊", "🎁", "🏆", "📱", "💻", "📧", "📞", "💰", "💵", "💳", "🛒", "📦", "✅", "❌", "⚠️", "📌", "🔔", "📢", "💬", "📊", "📈", "🕐", "📅"],
  },
];
