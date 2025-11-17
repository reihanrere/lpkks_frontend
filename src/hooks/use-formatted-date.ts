"use client";

import { format, parseISO, isValid, Locale } from "date-fns";
import { id } from "date-fns/locale";

/**
 * useFormattedDate
 *
 * A simple reusable hook for formatting dates using date-fns.
 * Automatically returns "-" if the date is missing or invalid.
 *
 * Usage:
 * const { formatDate } = useFormattedDate();
 * formatDate("2025-11-14");                   // → 14 Nov 2025
 * formatDate(date, "dd/MM/yyyy");             // → custom format
 * formatDate(date, "EEEE, dd MMMM yyyy");     // → long localized format
 */

export const useFormattedDate = () => {

  /**
   * formatDate
   *
   * @param date    - ISO string, Date object, or null
   * @param pattern - date-fns formatting pattern (default: "dd MMM yyyy")
   * @param locale  - output locale (default: Indonesian)
   *
   * Common formatting patterns:
   * "dd MMM yyyy"            → 14 Nov 2025
   * "dd/MM/yyyy"             → 14/11/2025
   * "EEEE, dd MMMM yyyy"     → Friday, 14 November 2025
   * "dd MMM yyyy HH:mm"      → 14 Nov 2025 09:32
   * "MMMM yyyy"              → November 2025
   *
   * Just call: formatDate(date, "your-pattern")
   */
  const formatDate = (
    date: string | Date | null | undefined,
    pattern: string = "dd MMM yyyy",
    locale: Locale = id
  ) => {
    // Return fallback for null/empty values
    if (!date) return "-";

    // Parse ISO strings or accept Date objects directly
    const parsed = typeof date === "string" ? parseISO(date) : date;

    // Validate the parsed date
    if (!isValid(parsed)) return "-";

    // Format the date with the provided pattern & locale
    return format(parsed, pattern, { locale });
  };

  return { formatDate };
};
