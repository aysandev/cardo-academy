# Run from the project root.
# This changes USER-FACING Persian "عمان" wording to "بین‌الملل".
# It intentionally keeps internal keys/routes such as:
#   category=oman
#   requestType: "oman"
#   lib/omanCourses.ts
# so existing routing and backend requests do not break.

$roots = @("app", "components", "lib")
$extensions = @("*.ts", "*.tsx")

$files = foreach ($root in $roots) {
    if (Test-Path $root) {
        Get-ChildItem -Path $root -Recurse -File -Include $extensions |
            Where-Object {
                # Arabic page is updated separately to proper Arabic wording.
                $_.FullName -notmatch "[\\/]app[\\/]ar[\\/]"
            }
    }
}

foreach ($file in $files) {
    $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $original = $content

    # More natural phrase-level replacements first
    $content = $content.Replace("دوره‌های عمان", "دوره‌های بین‌الملل")
    $content = $content.Replace("دوره های عمان", "دوره‌های بین‌الملل")
    $content = $content.Replace("برنامه‌های عمان", "برنامه‌های بین‌الملل")
    $content = $content.Replace("برنامه هاي عمان", "برنامه‌های بین‌الملل")
    $content = $content.Replace("فرصت‌های آموزشی عمان", "فرصت‌های آموزشی بین‌المللی")
    $content = $content.Replace("فرصت هاي آموزشي عمان", "فرصت‌های آموزشی بین‌المللی")
    $content = $content.Replace("بازار عمان و فرصت‌های بین‌المللی", "بازارهای بین‌المللی و فرصت‌های حرفه‌ای")
    $content = $content.Replace("بازار عمان", "بازارهای بین‌المللی")

    # Any remaining visible Persian occurrence
    $content = $content.Replace("عمان", "بین‌الملل")

    if ($content -ne $original) {
        Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host ""
Write-Host "Done."
Write-Host "Internal Latin identifiers like 'oman' were intentionally kept unchanged."
Write-Host "Now search the project for: عمان"
Write-Host "Then run: npm run dev"
