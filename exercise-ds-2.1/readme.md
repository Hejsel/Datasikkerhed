Hent programmet med og installer GnuPG fra https://www.gnupg.org/download/ find den version som passer til dit styresystem.

i terminalen:

gpg --gen-key

Angiv: Navn, Email og tryk o så de kan lave en kode som du skal angive, hvergang at du skal bruge din privatnøgle.

gpg --output public_key.asc --export --armor benjaminhejsel@gmail.com

TIP\* placer den oprettede fil under mappen C:\Users\benja\.gnupg

for at oprette en fil som indeholder din public-key som vi kan bruge til at uploaude.

Uploading kan gøres på https://keys.openpgp.org
