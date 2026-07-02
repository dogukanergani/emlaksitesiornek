/**
 * AKTİF TEMA SEÇİMİ
 * -----------------
 * Tüm sitenin rengi bu tek değere göre değişir.
 * Geçerli değerler: 'tema-1' | 'tema-2' | 'tema-3' | 'tema-4' | 'tema-5'
 *
 *   tema-1 → Varsayılan (mevcut yeşil tasarım)
 *   tema-2 → Lüks (koyu + altın/bronz)
 *   tema-3 → Doğa (toprak tonları + orman yeşili)
 *   tema-4 → Modern (gri + dinamik turuncu)
 *   tema-5 → Minimal (beyaz + siyah/koyu gri)
 *
 * Değiştirmek için aşağıdaki değeri güncellemeniz yeterli.
 */
export type ThemeId = "tema-1" | "tema-2" | "tema-3" | "tema-4" | "tema-5";

export const ACTIVE_THEME: ThemeId = "tema-1";
