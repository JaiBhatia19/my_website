#!/bin/bash

# LinkedIn Selenium Scraper Setup Script
# This script sets up the Python environment and dependencies for LinkedIn scraping

echo "🐍 Setting up LinkedIn Selenium Scraper..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    echo "   On macOS: brew install python3"
    echo "   On Ubuntu: sudo apt install python3 python3-pip"
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Install Chrome WebDriver
echo "🌐 Setting up Chrome WebDriver..."

# Check if Chrome is installed
if ! command -v google-chrome &> /dev/null && ! command -v chromium-browser &> /dev/null; then
    echo "⚠️  Chrome/Chromium not found. Please install Chrome for best compatibility."
    echo "   On macOS: brew install --cask google-chrome"
    echo "   On Ubuntu: sudo apt install google-chrome-stable"
fi

# Install webdriver-manager to automatically manage ChromeDriver
pip3 install webdriver-manager

echo "✅ Setup complete!"
echo ""
echo "🚀 Usage Instructions:"
echo "1. Set environment variables (optional for authenticated scraping):"
echo "   export LINKEDIN_EMAIL='your-email@example.com'"
echo "   export LINKEDIN_PASSWORD='your-password'"
echo ""
echo "2. Test the scraper:"
echo "   python3 scripts/linkedin_selenium_scraper.py"
echo ""
echo "3. The scraper will create 'linkedin_data.json' with your recent posts"
echo ""
echo "⚠️  Security Note: Never commit your LinkedIn credentials to version control!"
echo "   Use environment variables or a secure secrets manager."
