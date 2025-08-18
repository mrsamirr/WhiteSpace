
# WhiteSpace - Modern Blogging Platform

**WhiteSpace** is a modern, Medium-inspired blogging platform built with cutting-edge technologies. It offers a seamless writing and reading experience with advanced features like user profiles, categories, tags, likes, comments, and analytics.

## ✨ Features

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

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Icons**: Beautiful icon library

### Database Schema
- **Users**: Profiles, authentication, relationships
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
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with categories
npm run seed
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

### 5. Start Development Servers
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
│   │   │   └── comment.ts   # Comment system
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
└── README.md
```

## 🎯 Key Features Explained

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

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

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Customization
- Modify categories in `backend/prisma/seed.ts`
- Update colors and branding in `frontend/src/index.css`
- Customize UI components in `frontend/src/components/`

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
- Thanks to the open-source community

---

**WhiteSpace** - Where stories come to life. ✨

  



