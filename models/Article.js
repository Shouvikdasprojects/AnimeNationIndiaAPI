const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
    expires: 30 * 24 * 60 * 60 // Automatically delete after 30 days (1 month)
  },
  image: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  tags: [String],
  content: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  publishDate: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create text index for search query speed and ranking
ArticleSchema.index({
  title: 'text',
  excerpt: 'text',
  source: 'text',
  tags: 'text'
}, {
  weights: {
    title: 10,
    excerpt: 3,
    source: 2,
    tags: 1
  },
  name: 'ArticleSearchIndex'
});

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
