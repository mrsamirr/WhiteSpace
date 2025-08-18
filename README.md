
# WhiteSpace - Modern Blogging Platform

**WhiteSpace** is a modern, Medium-inspired blogging platform built with cutting-edge technologies. It offers a seamless writing and reading experience with advanced features like user profiles, categories, tags, likes, comments, and analytics.

## ✨ Features

### 🔐 Authentication
- **Email/Password Authentication**: Traditional signup and signin
- **Google OAuth**: One-click sign in with Google accounts
- **Automatic Account Linking**: Link email and Google accounts seamlessly
- **Profile Sync**: Automatic sync of Google profile information
- **Secure JWT Tokens**: 7-day session tokens with secure validation

### 🎨 Modern UI/UX
- **Medium-like Design**: Clean, modern interface inspired by Medium
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode Ready**: Built with modern design systems
- **Smooth Animations**: Subtle transitions and hover effects

### 📝 Content Management
- **Rich Text Editor**: Clean, distraction-free writing experience
- **Cover Images**: Add beautiful cover images to your stories
- **Categories & Tags**: Organize content with categories and tags
- **Draft System**: Save drafts and publish when ready
- **Excerpts**: Custom story summaries for better previews

### 👥 User Features
- **User Profiles**: Complete user profiles with avatars, bios, and social links
- **Dashboard**: Personal dashboard with analytics and post management
- **Following System**: Follow other writers and discover new content
- **User Analytics**: Track views, likes, and engagement

### 💬 Social Features
- **Comments**: Nested comment system with replies
- **Likes**: Like and unlike posts
- **Share**: Share stories on social media
- **Bookmarks**: Save stories for later reading

### 🔍 Discovery
- **Categories**: Browse content by categories
- **Tags**: Discover content through tags
- **Trending**: See what's popular
- **Search**: Find stories and authors

### 📊 Analytics
- **View Counts**: Track story views
- **Engagement Metrics**: Monitor likes and comments
- **Author Stats**: See your writing performance
- **Reader Insights**: Understand your audience

## 🛠️ Technology Stack

### Backend
- **Cloudflare Workers**: Serverless edge computing
- **Hono**: Fast, lightweight web framework
- **Prisma**: Type-safe database ORM
- **PostgreSQL**: Reliable relational database
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing
- **Google OAuth**: Secure third-party authentication

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Icons**: Beautiful icon library
- **@react-oauth/google**: Google OAuth integration

### Database Schema
- **Users**: Profiles, authentication, OAuth providers, relationships
- **Posts**: Stories with metadata and engagement
- **Categories**: Content organization
- **Tags**: Flexible content tagging
- **Comments**: Nested comment system
- **Likes**: User engagement tracking
- **Follows**: User relationships

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Cloudflare account (for deployment)
- Google Cloud account (for OAuth)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/whitespace.git
cd whitespace
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
touch .env
```

Add to `.env`:
```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id"
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
touch .env
```

Add to `.env`:
```env
VITE_GOOGLE_CLIENT_ID="your_google_client_id"
```

### 4. Database Setup
```bash
cd ../backend
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with categories
npm run seed
```

### 5. Google OAuth Setup
Follow the detailed guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) to:
- Create a Google Cloud project
- Enable Google Identity API
- Configure OAuth consent screen
- Create OAuth credentials
- Set up environment variables

### 6. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see your blog!

## 📁 Project Structure

```
whitespace/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── blog.ts      # Blog CRUD operations
│   │   │   ├── user.ts      # User management
│   │   │   ├── comment.ts   # Comment system
│   │   │   └── oauth.ts     # Google OAuth handling
│   │   └── index.ts         # Main server file
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Database seeding
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.tsx         # Main app component
│   └── package.json
├── GOOGLE_OAUTH_SETUP.md   # Google OAuth setup guide
└── README.md
```

## 🎯 Key Features Explained

### Authentication System
- **Dual Authentication**: Support for both email/password and Google OAuth
- **Account Linking**: Automatic linking of accounts with same email
- **Profile Sync**: Google profile data automatically imported
- **Secure Tokens**: JWT tokens with 7-day expiration
- **Password Hashing**: bcrypt for secure password storage

### Content Management
- Create, edit, and delete posts
- Draft system for work-in-progress
- Rich metadata (cover images, excerpts, categories)
- Tag system for content discovery

### Social Features
- Like/unlike posts
- Comment with nested replies
- Follow/unfollow users
- Share stories

### Analytics & Insights
- View count tracking
- Engagement metrics
- User dashboard with stats
- Performance insights

## 🔐 Authentication Flow

### Email/Password Flow
1. User signs up with email and password
2. Password is hashed with bcrypt
3. JWT token is generated and stored
4. User is redirected to dashboard

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authenticates with Google
4. Backend verifies Google ID token
5. User account is created/linked automatically
6. JWT token is generated and stored
7. User is redirected to dashboard

### Account Linking
- If a user signs up with email and later signs in with Google (same email), accounts are automatically linked
- Google profile information (name, avatar) is synced
- User can use either authentication method

## 🚀 Deployment

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist folder
```

### Environment Variables
Make sure to set these in your production environment:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `GOOGLE_CLIENT_ID`: Google OAuth client ID

### Customization
- Modify categories in `backend/prisma/seed.ts`
- Update colors and branding in `frontend/src/index.css`
- Customize UI components in `frontend/src/components/`
- Configure OAuth settings in Google Cloud Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Medium's design and functionality
- Built with modern web technologies
- Google OAuth integration for seamless authentication
- Thanks to the open-source community

---

**WhiteSpace** - Where stories come to life. ✨

  



