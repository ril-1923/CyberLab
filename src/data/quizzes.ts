import type { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Cybersecurity Fundamentals Quiz',
    category: 'Cybersecurity Fundamentals',
    description: 'Test your knowledge of core cybersecurity concepts, threats, and security principles.',
    xpReward: 200,
    questions: [
      { id: 'q1-1', type: 'multiple', question: 'What does the "C" in the CIA Triad stand for?', options: ['Control', 'Confidentiality', 'Compliance', 'Cryptography'], correctIndex: 1, explanation: 'The CIA Triad stands for Confidentiality, Integrity, and Availability — the three core principles of information security.' },
      { id: 'q1-2', type: 'multiple', question: 'Which of the following is an example of social engineering?', options: ['SQL Injection', 'Phishing', 'DDoS Attack', 'Buffer Overflow'], correctIndex: 1, explanation: 'Phishing is a social engineering attack that tricks users into revealing sensitive information through deceptive emails or messages.' },
      { id: 'q1-3', type: 'truefalse', question: 'A firewall can prevent all cyber attacks when properly configured.', options: ['True', 'False'], correctIndex: 1, explanation: 'No single security control can prevent all attacks. Defense in depth requires multiple layers of security.' },
      { id: 'q1-4', type: 'multiple', question: 'What is the principle of least privilege?', options: ['Giving users the minimum access needed to do their job', 'Only allowing admin access', 'Restricting all network traffic', 'Using the strongest encryption'], correctIndex: 0, explanation: 'The principle of least privilege means giving users only the minimum level of access necessary to perform their job functions.' },
      { id: 'q1-5', type: 'multiple', question: 'What does MFA stand for?', options: ['Main Frame Access', 'Multi-Factor Authentication', 'Managed File Access', 'Multiple Firewall Authorization'], correctIndex: 1, explanation: 'MFA (Multi-Factor Authentication) requires two or more verification factors, significantly improving security.' },
      { id: 'q1-6', type: 'truefalse', question: 'Encryption and hashing are the same thing.', options: ['True', 'False'], correctIndex: 1, explanation: 'Encryption is reversible (decryptable with a key), while hashing is a one-way function that cannot be reversed.' },
      { id: 'q1-7', type: 'multiple', question: 'Which attack floods a server with traffic to make it unavailable?', options: ['Phishing', 'DDoS', 'XSS', 'Man-in-the-Middle'], correctIndex: 1, explanation: 'A Distributed Denial of Service (DDoS) attack overwhelms a server with traffic from multiple sources, making it unavailable to legitimate users.' },
      { id: 'q1-8', type: 'multiple', question: 'What is a zero-day vulnerability?', options: ['A vulnerability that was patched zero days ago', 'A vulnerability with no available patch yet', 'A vulnerability found on day zero of testing', 'A vulnerability with zero impact'], correctIndex: 1, explanation: 'A zero-day vulnerability is a security flaw that is unknown to the vendor and for which no patch is available yet.' },
      { id: 'q1-9', type: 'truefalse', question: 'Social engineering targets technology, not people.', options: ['True', 'False'], correctIndex: 1, explanation: 'Social engineering targets human psychology and behavior, not technology. It manipulates people into breaking security procedures.' },
      { id: 'q1-10', type: 'multiple', question: 'What is the first phase of incident response?', options: ['Containment', 'Identification', 'Preparation', 'Recovery'], correctIndex: 2, explanation: 'Preparation is the first phase — establishing policies, tools, and training before an incident occurs.' },
    ],
  },
  {
    id: 'q2',
    title: 'Web Security Quiz',
    category: 'Web Security',
    description: 'Test your understanding of web application vulnerabilities and secure coding practices.',
    xpReward: 250,
    questions: [
      { id: 'q2-1', type: 'multiple', question: 'Which of the following is NOT in the OWASP Top 10?', options: ['Broken Access Control', 'Injection', 'Buffer Overflow', 'Cryptographic Failures'], correctIndex: 2, explanation: 'Buffer Overflow is not in the OWASP Top 10 for web applications, though it is a serious vulnerability in system-level software.' },
      { id: 'q2-2', type: 'multiple', question: 'What is the best defense against SQL injection?', options: ['Input validation only', 'Parameterized queries', 'Firewall rules', 'Hiding error messages'], correctIndex: 1, explanation: 'Parameterized queries (prepared statements) separate code from data, making SQL injection impossible.' },
      { id: 'q2-3', type: 'truefalse', question: 'Content-Security-Policy (CSP) can help prevent XSS attacks.', options: ['True', 'False'], correctIndex: 0, explanation: 'CSP restricts the sources from which content can be loaded, making it an effective defense against XSS.' },
      { id: 'q2-4', type: 'multiple', question: 'What does XSS stand for?', options: ['Cross-Site Scripting', 'Extra Security System', 'XML Security Standard', 'Cross-Server Synchronization'], correctIndex: 0, explanation: 'XSS stands for Cross-Site Scripting, an attack that injects malicious scripts into web pages viewed by other users.' },
      { id: 'q2-5', type: 'multiple', question: 'Which header helps prevent clickjacking?', options: ['X-Content-Type-Options', 'X-Frame-Options', 'Strict-Transport-Security', 'X-Powered-By'], correctIndex: 1, explanation: 'X-Frame-Options (or CSP frame-ancestors) prevents a page from being embedded in iframes, defending against clickjacking.' },
      { id: 'q2-6', type: 'truefalse', question: 'Storing passwords in plaintext is acceptable if the database is encrypted.', options: ['True', 'False'], correctIndex: 1, explanation: 'Passwords should always be hashed with a salt using a slow hashing function like bcrypt or Argon2, never stored in plaintext.' },
      { id: 'q2-7', type: 'multiple', question: 'What is CSRF?', options: ['Cross-Site Request Forgery', 'Client-Side Request Format', 'Cross-Server Resource Fetch', 'Common Security Risk Framework'], correctIndex: 0, explanation: 'CSRF (Cross-Site Request Forgery) tricks authenticated users into executing unwanted actions on a web application.' },
      { id: 'q2-8', type: 'multiple', question: 'Which cookie attribute helps prevent CSRF?', options: ['HttpOnly', 'Secure', 'SameSite', 'Max-Age'], correctIndex: 2, explanation: 'The SameSite cookie attribute restricts cookies from being sent with cross-site requests, mitigating CSRF.' },
      { id: 'q2-9', type: 'truefalse', question: 'Using GET requests for state-changing operations is a security best practice.', options: ['True', 'False'], correctIndex: 1, explanation: 'GET requests should be idempotent. State-changing operations should use POST, PUT, or DELETE to prevent CSRF and accidental actions.' },
      { id: 'q2-10', type: 'multiple', question: 'What is SSRF?', options: ['Server-Side Request Forgery', 'Secure Socket Request Format', 'Simple Service Request Framework', 'Server Security Risk Flag'], correctIndex: 0, explanation: 'SSRF (Server-Side Request Forgery) allows an attacker to make the server send requests to unintended internal or external resources.' },
    ],
  },
  {
    id: 'q3',
    title: 'Cryptography Quiz',
    category: 'Cryptography',
    description: 'Test your knowledge of encryption, hashing, and cryptographic protocols.',
    xpReward: 250,
    questions: [
      { id: 'q3-1', type: 'multiple', question: 'Which algorithm is a symmetric encryption standard?', options: ['RSA', 'AES', 'SHA-256', 'ECDSA'], correctIndex: 1, explanation: 'AES (Advanced Encryption Standard) is the most widely used symmetric encryption algorithm.' },
      { id: 'q3-2', type: 'multiple', question: 'Which hash function is considered broken?', options: ['SHA-256', 'SHA-3', 'MD5', 'BLAKE3'], correctIndex: 2, explanation: 'MD5 is considered cryptographically broken due to practical collision attacks and should not be used for security purposes.' },
      { id: 'q3-3', type: 'truefalse', question: 'RSA can be used for both encryption and digital signatures.', options: ['True', 'False'], correctIndex: 0, explanation: 'RSA is a versatile asymmetric algorithm that can be used for encryption, key exchange, and digital signatures.' },
      { id: 'q3-4', type: 'multiple', question: 'What is a salt in password hashing?', options: ['A type of encryption key', 'Random data added to passwords before hashing', 'A password complexity requirement', 'A type of hash function'], correctIndex: 1, explanation: 'A salt is random data added to a password before hashing to prevent rainbow table attacks and ensure unique hashes.' },
      { id: 'q3-5', type: 'multiple', question: 'What is a digital signature used for?', options: ['Encrypting data', 'Verifying authenticity and integrity', 'Compressing data', 'Hiding data'], correctIndex: 1, explanation: 'Digital signatures verify the authenticity (who sent it) and integrity (it was not modified) of a message.' },
      { id: 'q3-6', type: 'truefalse', question: 'Base64 encoding provides confidentiality for data.', options: ['True', 'False'], correctIndex: 1, explanation: 'Base64 is encoding, not encryption. It is easily reversible and provides no confidentiality. It only transforms data for transport.' },
      { id: 'q3-7', type: 'multiple', question: 'What is a PKI?', options: ['Public Key Infrastructure', 'Private Key Identifier', 'Primary Key Index', 'Password Key Interface'], correctIndex: 0, explanation: 'PKI (Public Key Infrastructure) is the framework for managing digital certificates and public-key encryption.' },
      { id: 'q3-8', type: 'multiple', question: 'Which protocol establishes a shared secret over an insecure channel?', options: ['AES', 'Diffie-Hellman', 'SHA-256', 'HMAC'], correctIndex: 1, explanation: 'Diffie-Hellman is a key exchange protocol that allows two parties to establish a shared secret over an insecure channel.' },
      { id: 'q3-9', type: 'truefalse', question: 'Quantum computers can break all encryption algorithms.', options: ['True', 'False'], correctIndex: 1, explanation: 'Quantum computers threaten asymmetric algorithms like RSA and ECC, but symmetric algorithms like AES-256 remain secure with doubled key sizes.' },
      { id: 'q3-10', type: 'multiple', question: 'What is a collision in hashing?', options: ['Two different inputs producing the same hash', 'A hash that is too long', 'A hash that cannot be reversed', 'A hash with no salt'], correctIndex: 0, explanation: 'A collision occurs when two different inputs produce the same hash output. Secure hash functions make collisions computationally infeasible to find.' },
    ],
  },
  {
    id: 'q4',
    title: 'Network Security Quiz',
    category: 'Network Security',
    description: 'Test your understanding of network security, firewalls, and protocols.',
    xpReward: 200,
    questions: [
      { id: 'q4-1', type: 'multiple', question: 'Which port does HTTPS use by default?', options: ['80', '443', '22', '21'], correctIndex: 1, explanation: 'HTTPS uses port 443 by default, providing encrypted web communication using TLS/SSL.' },
      { id: 'q4-2', type: 'multiple', question: 'What does IDS stand for?', options: ['Intrusion Detection System', 'Internal Defense Service', 'Integrated Data Security', 'Internet Domain System'], correctIndex: 0, explanation: 'IDS (Intrusion Detection System) monitors network traffic for suspicious activity and alerts administrators.' },
      { id: 'q4-3', type: 'truefalse', question: 'A VPN encrypts all traffic between the client and the VPN server.', options: ['True', 'False'], correctIndex: 0, explanation: 'A VPN creates an encrypted tunnel between the client and server, protecting data in transit from eavesdropping.' },
      { id: 'q4-4', type: 'multiple', question: 'What is network segmentation?', options: ['Dividing a network into smaller subnetworks', 'Splitting bandwidth equally', 'Removing unused ports', 'Using multiple ISPs'], correctIndex: 0, explanation: 'Network segmentation divides a network into smaller isolated subnetworks, limiting the spread of attacks and improving security.' },
      { id: 'q4-5', type: 'multiple', question: 'Which protocol is used for secure shell access?', options: ['Telnet', 'SSH', 'FTP', 'SNMP'], correctIndex: 1, explanation: 'SSH (Secure Shell) provides encrypted remote access, replacing the insecure Telnet protocol.' },
      { id: 'q4-6', type: 'truefalse', question: 'Default-deny firewall rules are more secure than default-allow.', options: ['True', 'False'], correctIndex: 0, explanation: 'Default-deny blocks all traffic by default and only allows explicitly permitted traffic, which is more secure than default-allow.' },
      { id: 'q4-7', type: 'multiple', question: 'What is a DMZ in network architecture?', options: ['A zone with no security', 'A buffer zone between trusted and untrusted networks', 'A type of firewall', 'A malware quarantine area'], correctIndex: 1, explanation: 'A DMZ (Demilitarized Zone) is a buffer network between the internal trusted network and the untrusted internet, hosting public-facing services.' },
      { id: 'q4-8', type: 'multiple', question: 'What does zero trust mean in network security?', options: ['Trust no one by default', 'No security controls needed', 'Trust only encrypted connections', 'No network monitoring'], correctIndex: 0, explanation: 'Zero Trust means never trust anyone or anything by default — verify every access request regardless of network location.' },
      { id: 'q4-9', type: 'truefalse', question: 'Telnet transmits data in encrypted form.', options: ['True', 'False'], correctIndex: 1, explanation: 'Telnet transmits data including passwords in plaintext. SSH should be used instead for secure remote access.' },
      { id: 'q4-10', type: 'multiple', question: 'Which tool is commonly used for network packet analysis?', options: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite'], correctIndex: 1, explanation: 'Wireshark is the industry-standard network protocol analyzer for capturing and inspecting network packets.' },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
