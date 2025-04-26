
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
