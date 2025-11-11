using System.Globalization;
using System.Text;
using System.Linq;

namespace TaskApi.Helpers
{
    public class TextHelper
    {
        public static string Normalize(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) 
                return string.Empty;

            var normalized = input.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder();
            foreach (var c in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }

            return sb.ToString().Normalize(NormalizationForm.FormC).ToLowerInvariant();
        }
    }
}
