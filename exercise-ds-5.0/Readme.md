──(benjamin㉿Voldemort)-[~/Skrivebord]
└─$ hashcat -m 3200 -a 0 passwordlist.txt ordbog.txt
hashcat (v6.2.6) starting

OpenCL API (OpenCL 3.0 PoCL 6.0+debian  Linux, None+Asserts, RELOC, LLVM 17.0.6, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
============================================================================================================================================
* Device #1: cpu-penryn-11th Gen Intel(R) Core(TM) i7-11370H @ 3.30GHz, 1438/2941 MB (512 MB allocatable), 2MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 72

Hashes: 5 digests; 5 unique digests, 5 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte

Watchdog: Temperature abort trigger set to 90c

Host memory required for this attack: 0 MB

Dictionary cache built:
* Filename..: ordbog.txt
* Passwords.: 5
* Bytes.....: 41
* Keyspace..: 5
* Runtime...: 0 secs

$2a$12$Nfjvw1rKt6lKy9EuDWxcK.3CvQ.b0pGME7gcsSvLVtV4gAu.wfgTO:password
$2a$12$qMPiYPxH8RnlBMKiXkaciuBbNdBhd3bLG56TqN4O2BVG4JbPJd8mK:123456
$2a$12$2Mm/UV92l4rlfLgxW3pyFeYyblNjO7hg4iHfkExmj0Ot5cPWaaJke:123456789
Approaching final keyspace - workload adjusted.          

$2a$12$O8UdTVd.44iD/cvRE8941O6GZVzhqjh3ZsewahxArO6HmCV4J1he6:iloveyou