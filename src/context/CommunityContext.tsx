import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { timelineEventsData } from '../data/gtaData';

export interface Comment {
  id: string;
  username: string;
  avatarSeed: string;
  content: string;
  timestamp: string;
  reputationScore: number;
  badge?: 'Contributor' | 'Veteran Check' | 'Moderator' | 'Regular' | 'Elite Debunker';
  likes: number;
  userLiked?: boolean;
}

export interface ArticleMetrics {
  likes: number;
  dislikes: number;
  userVote: 'like' | 'dislike' | null;
  reported: boolean;
  reportsCount: number;
}

export interface UserProfile {
  username: string;
  avatarSeed: string;
  reputation: number;
  contributorBadge: 'Silver Check' | 'Gold Analyst' | 'None';
  reputationBadge: 'Novice' | 'Trusted Fact-Checker' | 'Elite Debunker' | 'Admin';
  stats: {
    commentsCount: number;
    votesCast: number;
    reportsSubmitted: number;
    bookmarksCount: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'badge' | 'verify' | 'system' | 'like';
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatarSeed: string;
  reputation: number;
  isCurrentUser?: boolean;
  badge: 'Contributor' | 'Moderator' | 'Elite Debunker' | 'Trusted Fact-Checker' | 'Regular';
  verifiedClaims: number;
}

interface CommunityContextType {
  comments: Record<string, Comment[]>;
  metrics: Record<string, ArticleMetrics>;
  bookmarks: string[];
  userProfile: UserProfile;
  notifications: NotificationItem[];
  leaderboard: LeaderboardEntry[];
  addComment: (articleId: string, content: string) => void;
  likeComment: (articleId: string, commentId: string) => void;
  voteArticle: (articleId: string, vote: 'like' | 'dislike') => void;
  reportArticle: (articleId: string) => void;
  toggleBookmark: (articleId: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// Initial mock comments
const INITIAL_COMMENTS: Record<string, Comment[]> = {
  t1: [
    {
      id: 'c1',
      username: 'LeonidaInvestigator',
      avatarSeed: 'investigator',
      content: 'I remember downloading that massive leak file on GTAForums. It felt unreal seeing the debug codes. Truly historical day!',
      timestamp: '2 hours ago',
      reputationScore: 480,
      badge: 'Contributor',
      likes: 42
    },
    {
      id: 'c2',
      username: 'ViceCitySiren',
      avatarSeed: 'siren',
      content: 'The debug text showing Vice City and Lucia wearing her ankle monitor proved this leak was real from the first hour.',
      timestamp: '1 hour ago',
      reputationScore: 820,
      badge: 'Moderator',
      likes: 19
    }
  ],
  t3: [
    {
      id: 'c3',
      username: 'TomPettyFan',
      avatarSeed: 'petty',
      content: 'The choice of "Love Is a Long Road" is flawless. It matches the Lucia and Jason dynamic so beautifully.',
      timestamp: '3 days ago',
      reputationScore: 230,
      badge: 'Regular',
      likes: 124
    },
    {
      id: 'c4',
      username: 'GamerRage',
      avatarSeed: 'rage',
      content: 'The graphical leap in this trailer is insane. Look at the beach crowd density, that cannot run on older consoles!',
      timestamp: '2 days ago',
      reputationScore: 95,
      badge: 'Regular',
      likes: 54
    }
  ],
  t7: [
    {
      id: 'c5',
      username: 'AntiDebunk',
      avatarSeed: 'de',
      content: 'Thank god for the verification index. TikTok was going crazy claiming the game will cost $150. Ridiculous mockup!',
      timestamp: '1 day ago',
      reputationScore: 610,
      badge: 'Elite Debunker',
      likes: 88
    }
  ]
};

// Initial mock metrics
const INITIAL_METRICS: Record<string, ArticleMetrics> = {
  t1: { likes: 320, dislikes: 12, userVote: null, reported: false, reportsCount: 0 },
  t2: { likes: 580, dislikes: 3, userVote: null, reported: false, reportsCount: 0 },
  t3: { likes: 1420, dislikes: 8, userVote: null, reported: false, reportsCount: 0 },
  t4: { likes: 710, dislikes: 24, userVote: null, reported: false, reportsCount: 0 },
  t5: { likes: 412, dislikes: 45, userVote: null, reported: false, reportsCount: 0 },
  t6: { likes: 180, dislikes: 92, userVote: null, reported: false, reportsCount: 2 },
  t7: { likes: 45, dislikes: 340, userVote: null, reported: false, reportsCount: 14 }
};

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'ViceCitySiren', avatarSeed: 'siren', reputation: 1250, badge: 'Moderator', verifiedClaims: 42 },
  { rank: 2, username: 'EliteLeonidaSpotter', avatarSeed: 'spotter', reputation: 980, badge: 'Elite Debunker', verifiedClaims: 28 },
  { rank: 3, username: 'AntiDebunk', avatarSeed: 'de', reputation: 810, badge: 'Elite Debunker', verifiedClaims: 19 },
  { rank: 4, username: 'MyReputationUser', avatarSeed: 'me', reputation: 450, isCurrentUser: true, badge: 'Trusted Fact-Checker', verifiedClaims: 8 },
  { rank: 5, username: 'LeonidaInvestigator', avatarSeed: 'investigator', reputation: 420, badge: 'Contributor', verifiedClaims: 11 },
  { rank: 6, username: 'MapArchitect', avatarSeed: 'map', reputation: 390, badge: 'Contributor', verifiedClaims: 7 },
  { rank: 7, username: 'JasonStrap', avatarSeed: 'jason', reputation: 150, badge: 'Regular', verifiedClaims: 2 }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Verification Approved',
    message: 'Your report on "Speculated 2027 Internal Delay" was analyzed by AI. Trust Index reduced to 35%.',
    timestamp: '2 hours ago',
    read: false,
    type: 'verify'
  },
  {
    id: 'n2',
    title: 'New Badge Awarded!',
    message: 'Congratulations! You earned the "Trusted Fact-Checker" reputation badge for submitting high-quality reviews.',
    timestamp: '1 day ago',
    read: false,
    type: 'badge'
  },
  {
    id: 'n3',
    title: 'Comment Liked',
    message: 'Your comment on "Trailer 1 Debuts Worldwide" received 15 likes from the community.',
    timestamp: '3 days ago',
    read: true,
    type: 'like'
  }
];

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem('gta6_hub_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [metrics, setMetrics] = useState<Record<string, ArticleMetrics>>(() => {
    const saved = localStorage.getItem('gta6_hub_metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('gta6_hub_bookmarks');
    return saved ? JSON.parse(saved) : ['t3', 't4'];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gta6_hub_user_profile');
    if (saved) return JSON.parse(saved);
    return {
      username: 'MyReputationUser',
      avatarSeed: 'me',
      reputation: 450,
      contributorBadge: 'Silver Check',
      reputationBadge: 'Trusted Fact-Checker',
      stats: {
        commentsCount: 4,
        votesCast: 18,
        reportsSubmitted: 3,
        bookmarksCount: 2
      }
    };
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('gta6_hub_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  useEffect(() => {
    localStorage.setItem('gta6_hub_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('gta6_hub_metrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('gta6_hub_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('gta6_hub_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('gta6_hub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handle reputation and badges sync with leaderboard
  useEffect(() => {
    setLeaderboard(prev => 
      prev.map(entry => {
        if (entry.isCurrentUser) {
          return {
            ...entry,
            reputation: userProfile.reputation,
            badge: userProfile.reputationBadge as any
          };
        }
        return entry;
      }).sort((a, b) => b.reputation - a.reputation)
        .map((entry, idx) => ({ ...entry, rank: idx + 1 }))
    );
  }, [userProfile.reputation, userProfile.reputationBadge]);

  const addComment = (articleId: string, content: string) => {
    if (!content.trim()) return;

    const newComment: Comment = {
      id: `c_new_${Date.now()}`,
      username: userProfile.username,
      avatarSeed: userProfile.avatarSeed,
      content,
      timestamp: 'Just now',
      reputationScore: userProfile.reputation,
      badge: 'Contributor',
      likes: 0
    };

    setComments(prev => {
      const articleComments = prev[articleId] || [];
      return {
        ...prev,
        [articleId]: [newComment, ...articleComments]
      };
    });

    // Increase user reputation for adding a comment
    const repReward = 15;
    setUserProfile(prev => {
      const newRep = prev.reputation + repReward;
      let repBadge = prev.reputationBadge;
      let contBadge = prev.contributorBadge;

      if (newRep >= 600) {
        repBadge = 'Elite Debunker';
        contBadge = 'Gold Analyst';
      }

      return {
        ...prev,
        reputation: newRep,
        reputationBadge: repBadge,
        contributorBadge: contBadge,
        stats: {
          ...prev.stats,
          commentsCount: prev.stats.commentsCount + 1
        }
      };
    });

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `n_new_${Date.now()}`,
      title: 'Reputation Gain!',
      message: `You earned +${repReward} Reputation for commenting on the news feed.`,
      timestamp: 'Just now',
      read: false,
      type: 'like'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const likeComment = (articleId: string, commentId: string) => {
    setComments(prev => {
      const articleComments = prev[articleId] || [];
      return {
        ...prev,
        [articleId]: articleComments.map(c => {
          if (c.id === commentId) {
            const alreadyLiked = c.userLiked;
            return {
              ...c,
              likes: alreadyLiked ? c.likes - 1 : c.likes + 1,
              userLiked: !alreadyLiked
            };
          }
          return c;
        })
      };
    });
  };

  const voteArticle = (articleId: string, vote: 'like' | 'dislike') => {
    setMetrics(prev => {
      const current = prev[articleId] || { likes: 10, dislikes: 0, userVote: null, reported: false, reportsCount: 0 };
      let newLikes = current.likes;
      let newDislikes = current.dislikes;
      let newVote = current.userVote;

      if (current.userVote === vote) {
        // Undo vote
        if (vote === 'like') newLikes--;
        else newDislikes--;
        newVote = null;
      } else {
        // Change or apply vote
        if (current.userVote === 'like') newLikes--;
        if (current.userVote === 'dislike') newDislikes--;

        if (vote === 'like') newLikes++;
        else newDislikes++;
        newVote = vote;
      }

      return {
        ...prev,
        [articleId]: {
          ...current,
          likes: newLikes,
          dislikes: newDislikes,
          userVote: newVote
        }
      };
    });

    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        votesCast: prev.stats.votesCast + 1
      }
    }));
  };

  const reportArticle = (articleId: string) => {
    setMetrics(prev => {
      const current = prev[articleId] || { likes: 10, dislikes: 0, userVote: null, reported: false, reportsCount: 0 };
      if (current.reported) return prev; // already reported

      return {
        ...prev,
        [articleId]: {
          ...current,
          reported: true,
          reportsCount: current.reportsCount + 1
        }
      };
    });

    const repReward = 5;
    setUserProfile(prev => ({
      ...prev,
      reputation: prev.reputation + repReward,
      stats: {
        ...prev.stats,
        reportsSubmitted: prev.stats.reportsSubmitted + 1
      }
    }));

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `n_rep_${Date.now()}`,
      title: 'Report Submitted',
      message: `Your report on article #${articleId} was queued for moderation. You earned +5 Rep!`,
      timestamp: 'Just now',
      read: false,
      type: 'verify'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(articleId);
      const updated = isBookmarked 
        ? prev.filter(id => id !== articleId) 
        : [...prev, articleId];
      
      setUserProfile(p => ({
        ...p,
        stats: {
          ...p.stats,
          bookmarksCount: updated.length
        }
      }));

      return updated;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <CommunityContext.Provider value={{
      comments,
      metrics,
      bookmarks,
      userProfile,
      notifications,
      leaderboard,
      addComment,
      likeComment,
      voteArticle,
      reportArticle,
      toggleBookmark,
      markNotificationAsRead,
      clearAllNotifications
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
