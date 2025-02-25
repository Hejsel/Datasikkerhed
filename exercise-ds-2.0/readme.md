Skriv følgende kommando inde i den mappe som filen ligger placeret i VS-Code.

gpg --encrypt --recipient benjaminhejsel@gmail.com --output message_to_friend.gpg SecE1.enc.txt

Følgende kommando vil:

gpg = Kører GnuPG-programmet

--encrypt = Krypterer en fil

--recipient benjaminhejsel@gmail.com = Angiver modtagerens GPG-nøgle (personen, der kan dekryptere)

--output message_to_friend.gpg = Bestemmer navnet på den krypterede fil

SecE1.enc.txt = Inddatafilen (den fil, der skal krypteres)

Prøv nu at dekryptere tekstfilen = message_to_friend.gpg
