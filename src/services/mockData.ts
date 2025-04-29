import { ActivityItem } from "@/components/dashboard/ActivityList";
import { NewsItem } from "@/components/dashboard/NewsFeed";

export const mockActivities: ActivityItem[] = [
  {
    id: "act1",
    type: "alert",
    title: "Suspicious transaction detected",
    description: "Multiple high-volume transactions from flagged address 8xJU...k9fG",
    timestamp: "5 min ago",
    risk: "high"
  },
  {
    id: "act2",
    type: "transaction",
    title: "Unusual token transfer",
    description: "Large amount of SOL transferred to new wallet with no history",
    timestamp: "15 min ago",
    risk: "medium"
  },
  {
    id: "act3",
    type: "alert",
    title: "Contract interaction warning",
    description: "Interaction with unverified smart contract at 3rA9...dP23",
    timestamp: "32 min ago",
    risk: "high"
  },
  {
    id: "act4",
    type: "news",
    title: "New vulnerability report",
    description: "Security researchers identified potential exploit in popular DeFi protocol",
    timestamp: "1 hour ago",
    risk: "medium"
  },
  {
    id: "act5",
    type: "transaction",
    title: "Normal transaction",
    description: "SOL transfer to known exchange wallet",
    timestamp: "3 hours ago",
    risk: "none"
  }
];

export const mockNews: NewsItem[] = [
  {
    id: "news1",
    title: "New phishing campaign targeting Solana users discovered",
    source: "CryptoSecurity",
    timestamp: "2 hours ago",
    category: "fraud",
    relevance: 9,
    url: "#"
  },
  {
    id: "news2",
    title: "Major exchange enhances security measures for Solana withdrawals",
    source: "CoinDesk",
    timestamp: "5 hours ago",
    category: "security",
    relevance: 7,
    url: "#"
  },
  {
    id: "news3",
    title: "Hackers drain $3M from vulnerable Solana DeFi protocol",
    source: "BlockchainTimes",
    timestamp: "1 day ago",
    category: "hack",
    relevance: 10,
    url: "#"
  },
  {
    id: "news4",
    title: "Solana Foundation releases security best practices guide",
    source: "SolanaNews",
    timestamp: "2 days ago",
    category: "security",
    relevance: 6,
    url: "#"
  },
  {
    id: "news5",
    title: "New on-chain analysis reveals suspicious token distribution patterns",
    source: "CryptoAnalytics",
    timestamp: "3 days ago",
    category: "fraud",
    relevance: 8,
    url: "#"
  }
];

// Mock stats data
export const mockStats = {
  suspiciousTransactions: {
    value: 27,
    trend: { value: 12, positive: false }
  },
  riskScore: {
    value: 68,
    trend: { value: 5, positive: true }
  },
  flaggedAddresses: {
    value: 143,
    trend: { value: 23, positive: false }
  },
  securityIncidents: {
    value: 8,
    trend: { value: 2, positive: false }
  }
};

// Mock tokens with security concerns
export const mockRiskyTokens = [
  { name: "SOL Token A", ticker: "SOLA", risk: 89, marketCap: "$2.4M" },
  { name: "SOL Token B", ticker: "SOLB", risk: 76, marketCap: "$5.1M" },
  { name: "SOL Token C", ticker: "SOLC", risk: 62, marketCap: "$1.8M" },
  { name: "SOL Token D", ticker: "SOLD", risk: 94, marketCap: "$0.9M" },
];

// Mock alerts data
export const mockAlerts = [
  {
    id: "alert1",
    title: "Suspicious Wallet Activity",
    description: "Multiple high-volume transactions from a newly created wallet with no history",
    timestamp: "2025-04-29T08:15:00Z",
    severity: "High",
    type: "Transaction",
    source: "On-chain Analysis",
    status: "Active",
    affectedAddress: "8xJUH9uT1KcFf6NpvL2D7k9fGn5PJ4Y",
    technicalDetails: {
      impact: "Potential money laundering or wash trading activity that could affect market integrity",
      recommendation: "Monitor the address for additional suspicious patterns and check transaction recipients"
    },
    relatedTransactions: [
      {
        hash: "5nFR9VbT2JKmXzQcLwH7pP1sD8B3N6G4M",
        type: "SOL Transfer",
        status: "Completed"
      },
      {
        hash: "7kPL3McB5Rx2TsV9FyN1wQ6hZ4jW8S",
        type: "Token Swap",
        status: "Completed"
      }
    ],
    logs: [
      "2025-04-29 08:15:23: Initial detection of unusual transaction pattern",
      "2025-04-29 08:16:05: Multiple high-value transfers detected in sequence",
      "2025-04-29 08:17:12: Correlation with known suspicious addresses confirmed"
    ],
    securityAnalysis: "This alert indicates a potential attempt to obscure funds through rapid sequential transactions. The transactions involve multiple newly created wallets with no prior activity, a common pattern in money laundering operations on blockchain networks."
  },
  {
    id: "alert2",
    title: "Smart Contract Vulnerability",
    description: "Potential reentrancy vulnerability detected in contract",
    timestamp: "2025-04-28T14:22:00Z",
    severity: "Critical",
    type: "Contract",
    source: "Automated Audit",
    status: "Active",
    affectedAddress: "3rA9zP8dD23KmXsQjLwrW7bZ1pF5",
    technicalDetails: {
      impact: "Risk of unauthorized token withdrawals and potential loss of user funds",
      recommendation: "Implement checks-effects-interactions pattern and reentrancy guards"
    },
    relatedTransactions: [
      {
        hash: "9qRS7BvN3ZpT5xW2JkL8MfD6gH1R4y",
        type: "Contract Interaction",
        status: "Completed"
      }
    ],
    logs: [
      "2025-04-28 14:22:10: Vulnerability pattern detected in contract code",
      "2025-04-28 14:23:45: Static analysis confirms potential attack vector",
      "2025-04-28 14:25:30: Previous similar exploits identified in contract history"
    ],
    securityAnalysis: "The smart contract contains a critical vulnerability where state changes occur after external calls, creating potential for reentrancy attacks. This pattern has been exploited in several major DeFi hacks and requires immediate attention."
  },
  {
    id: "alert3",
    title: "Phishing Campaign Detected",
    description: "New phishing campaign targeting Solana wallet holders via social media",
    timestamp: "2025-04-27T09:05:00Z",
    severity: "Medium",
    type: "Phishing",
    source: "Threat Intelligence",
    status: "Resolved",
    affectedAddress: "N/A",
    technicalDetails: {
      impact: "Risk of credential theft and unauthorized wallet access for users",
      recommendation: "Educate users about verification procedures and official communication channels"
    },
    relatedTransactions: [],
    logs: [
      "2025-04-27 09:05:15: Initial phishing attempt detected via social monitoring",
      "2025-04-27 09:30:22: Campaign pattern identified across multiple platforms",
      "2025-04-27 10:15:40: Phishing domains blacklisted and reported"
    ],
    securityAnalysis: "This phishing campaign utilizes sophisticated social engineering tactics, impersonating official Solana channels and offering fake airdrops or security upgrades. The attackers are targeting users through Twitter, Discord, and Telegram with convincing messaging that appears legitimate."
  },
  {
    id: "alert4",
    title: "Abnormal Gas Price Spike",
    description: "Sudden 300% increase in network gas prices detected",
    timestamp: "2025-04-26T18:30:00Z",
    severity: "Low",
    type: "Network",
    source: "Network Monitor",
    status: "Resolved",
    affectedAddress: "Network-wide",
    technicalDetails: {
      impact: "Temporary increase in transaction costs and potential transaction delays",
      recommendation: "Implement gas price oracles and dynamic fee adjustment for applications"
    },
    relatedTransactions: [],
    logs: [
      "2025-04-26 18:30:05: Initial spike in gas prices detected",
      "2025-04-26 18:35:12: Analysis confirms network-wide pattern",
      "2025-04-26 19:15:30: Gas prices returned to normal levels"
    ],
    securityAnalysis: "The temporary gas price increase appears to be related to a coordinated NFT launch that generated unusually high transaction volumes. While not malicious, this type of activity can disrupt normal network operations and increase costs for users during peak periods."
  },
  {
    id: "alert5",
    title: "Exchange Liquidity Drop",
    description: "Major exchange experiencing 45% liquidity reduction for SOL pair",
    timestamp: "2025-04-25T11:10:00Z",
    severity: "Medium",
    type: "Market",
    source: "Market Analysis",
    status: "Active",
    affectedAddress: "Exchange: SolTradeX",
    technicalDetails: {
      impact: "Increased slippage and potential price manipulation vulnerability",
      recommendation: "Diversify exchange usage and implement slippage protection"
    },
    relatedTransactions: [],
    logs: [
      "2025-04-25 11:10:20: Liquidity reduction detected across multiple pairs",
      "2025-04-25 11:18:45: Pattern suggests coordinated liquidity withdrawal",
      "2025-04-25 11:30:15: Market impact analysis initiated"
    ],
    securityAnalysis: "The significant reduction in exchange liquidity creates conditions where market manipulation becomes easier through techniques like wash trading or spoofing. Traders should exercise caution and implement strict slippage tolerances until liquidity returns to normal levels."
  }
];

// Mock threats data
export const mockThreats = [
  {
    id: "threat1",
    name: "Supply Chain Attack Campaign",
    description: "Sophisticated attack targeting development dependencies in Solana ecosystem projects",
    dateIdentified: "2025-04-15T09:30:00Z",
    level: "Critical",
    type: "Supply Chain",
    origin: "Advanced Persistent Threat",
    status: "Active",
    affectedSystems: ["Development Tools", "Package Managers", "CI/CD Pipelines"],
    mitigationProgress: 35,
    attackVector: {
      methodology: "The attackers compromise development dependencies and inject malicious code that exfiltrates private keys and sensitive data when applications are built or deployed.",
      impact: "Potential compromise of developer private keys, deployment credentials, and end-user wallets through infected applications."
    },
    indicatorsOfCompromise: [
      {
        type: "Package Hash",
        value: "f8e4a9c7b3d1e0a6f2c5b9d7e3a1c8f6b2d5a9c7e3f1b8d4a7c2e5b9f3d6a8c2",
        confidence: 95
      },
      {
        type: "Domain",
        value: "sol-updates.net",
        confidence: 87
      },
      {
        type: "IP Address",
        value: "193.27.14.85",
        confidence: 92
      }
    ],
    timeline: [
      {
        date: "2025-04-10T14:22:00Z",
        title: "Initial Compromise",
        description: "First evidence of compromised package uploaded to registry"
      },
      {
        date: "2025-04-12T08:15:00Z",
        title: "Campaign Expansion",
        description: "Additional packages compromised across multiple registries"
      },
      {
        date: "2025-04-15T09:30:00Z",
        title: "Detection and Disclosure",
        description: "Threat identified and initial advisory published"
      }
    ]
  },
  {
    id: "threat2",
    name: "Validator Infrastructure Targeting",
    description: "Coordinated campaign to compromise Solana validator infrastructure through zero-day exploits",
    dateIdentified: "2025-04-08T16:45:00Z",
    level: "High",
    type: "Infrastructure",
    origin: "State-Sponsored Group",
    status: "Active",
    affectedSystems: ["Validators", "RPC Nodes", "Monitoring Systems"],
    mitigationProgress: 65,
    attackVector: {
      methodology: "Attackers utilize previously unknown vulnerabilities in common validator hosting platforms to gain unauthorized access and potentially manipulate transaction processing.",
      impact: "Risk of transaction censorship, degraded network performance, and potential double-spend attacks if sufficient validators are compromised."
    },
    indicatorsOfCompromise: [
      {
        type: "Vulnerability",
        value: "CVE-2025-28764",
        confidence: 98
      },
      {
        type: "Malware Hash",
        value: "2d7e3a1c8f6b2d5a9c7e3f1b8d4a7c2e5b9f3d6a8c2e4a9c7b3d1e0a6f2c5b9",
        confidence: 91
      },
      {
        type: "Network Pattern",
        value: "Unusual DNS queries to *.val-metrics.io",
        confidence: 85
      }
    ],
    timeline: [
      {
        date: "2025-04-02T10:30:00Z",
        title: "Initial Detection",
        description: "Unusual access patterns detected on validator infrastructure"
      },
      {
        date: "2025-04-05T22:15:00Z",
        title: "Exploit Identification",
        description: "Zero-day vulnerability identified in validator management software"
      },
      {
        date: "2025-04-08T16:45:00Z",
        title: "Campaign Confirmation",
        description: "Pattern analysis confirms coordinated campaign targeting validators"
      }
    ]
  },
  {
    id: "threat3",
    name: "Advanced DeFi Manipulation Scheme",
    description: "Sophisticated price manipulation and oracle attack methodology targeting Solana DeFi protocols",
    dateIdentified: "2025-03-22T11:20:00Z",
    level: "Critical",
    type: "Financial",
    origin: "Organized Crime",
    status: "Mitigated",
    affectedSystems: ["DeFi Protocols", "Lending Platforms", "Oracle Services"],
    mitigationProgress: 90,
    attackVector: {
      methodology: "Attackers exploit flash loan mechanisms to temporarily manipulate price oracles, enabling them to extract value through arbitrage and liquidations.",
      impact: "Financial losses for protocol users, potential protocol insolvency, and loss of market confidence."
    },
    indicatorsOfCompromise: [
      {
        type: "Transaction Pattern",
        value: "Multiple flash loans followed by cross-protocol interactions within 2 blocks",
        confidence: 94
      },
      {
        type: "Wallet Address",
        value: "5nFR9VbT2JKmXzQcLwH7pP1sD8B3N6G4M",
        confidence: 97
      },
      {
        type: "Price Movement",
        value: ">15% price deviation between oracles in <30 seconds",
        confidence: 88
      }
    ],
    timeline: [
      {
        date: "2025-03-20T14:30:00Z",
        title: "Preparation Activity",
        description: "Suspicious wallet funding patterns observed across multiple exchanges"
      },
      {
        date: "2025-03-21T19:45:00Z",
        title: "Initial Attack",
        description: "First successful oracle manipulation attack executed against smaller protocol"
      },
      {
        date: "2025-03-22T11:20:00Z",
        title: "Attack Expansion",
        description: "Pattern replicated against multiple major protocols"
      },
      {
        date: "2025-03-23T08:10:00Z",
        title: "Mitigation Deployed",
        description: "Oracle circuit breakers and enhanced validations implemented across affected protocols"
      }
    ]
  },
  {
    id: "threat4",
    name: "Cross-Chain Bridge Vulnerability",
    description: "Critical security flaw in popular cross-chain bridge protocol enabling unauthorized token transfers",
    dateIdentified: "2025-03-15T07:30:00Z",
    level: "Critical",
    type: "Protocol",
    origin: "Unknown",
    status: "Mitigated",
    affectedSystems: ["Bridge Contracts", "Token Wrappers", "Liquidity Pools"],
    mitigationProgress: 100,
    attackVector: {
      methodology: "Vulnerability in signature verification allows attackers to forge valid transfer approvals, potentially draining bridge reserves.",
      impact: "Risk of catastrophic fund loss for bridge providers and users with cross-chain positions."
    },
    indicatorsOfCompromise: [
      {
        type: "Contract Interaction",
        value: "Abnormal verification bypass pattern in transfer authorization function",
        confidence: 99
      },
      {
        type: "Code Pattern",
        value: "Insufficient validation in _verifySignature() implementation",
        confidence: 100
      }
    ],
    timeline: [
      {
        date: "2025-03-14T22:15:00Z",
        title: "Vulnerability Discovery",
        description: "Security researcher identified critical verification bypass vulnerability"
      },
      {
        date: "2025-03-15T01:30:00Z",
        title: "Vendor Notification",
        description: "Bridge developers notified and emergency response initiated"
      },
      {
        date: "2025-03-15T07:30:00Z",
        title: "Public Disclosure",
        description: "Controlled disclosure to allow users to secure funds"
      },
      {
        date: "2025-03-15T12:45:00Z",
        title: "Patch Deployment",
        description: "Emergency fix deployed and verified across all implementations"
      }
    ]
  },
  {
    id: "threat5",
    name: "Social Engineering Campaign",
    description: "Large-scale social engineering campaign targeting Solana ecosystem employees and developers",
    dateIdentified: "2025-03-05T13:15:00Z",
    level: "Medium",
    type: "Social Engineering",
    origin: "Financially Motivated Group",
    status: "Active",
    affectedSystems: ["Development Teams", "Project Administrators", "Community Managers"],
    mitigationProgress: 45,
    attackVector: {
      methodology: "Attackers use sophisticated spear-phishing techniques and impersonation tactics to gain access to project repositories and deployment credentials.",
      impact: "Potential code compromise, backdoor insertion, or direct theft of funds through modified deployments."
    },
    indicatorsOfCompromise: [
      {
        type: "Email Pattern",
        value: "Spoofed sender: *@so1ana-foundation.org (note the number 1 instead of letter l)",
        confidence: 96
      },
      {
        type: "Document Hash",
        value: "7c2e5b9f3d6a8c2e4a9c7b3d1e0a6f2c5b9d7e3a1c8f6b2d5a9c7e3f1b8d4a",
        confidence: 92
      },
      {
        type: "URL Pattern",
        value: "https://github-secur1ty.com/*",
        confidence: 89
      }
    ],
    timeline: [
      {
        date: "2025-03-01T09:20:00Z",
        title: "Campaign Initiation",
        description: "First wave of targeted emails sent to Solana ecosystem developers"
      },
      {
        date: "2025-03-03T15:40:00Z",
        title: "Campaign Expansion",
        description: "Tactics evolved to include Telegram and Discord impersonation"
      },
      {
        date: "2025-03-05T13:15:00Z",
        title: "Campaign Identification",
        description: "Pattern recognized and initial advisory issued to ecosystem participants"
      }
    ]
  }
];
