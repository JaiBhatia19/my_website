#!/usr/bin/env python3
"""
LinkedIn Selenium Scraper for Personal Website
Scrapes recent LinkedIn activity using Selenium WebDriver
"""

import os
import json
import time
import logging
from datetime import datetime
from typing import List, Dict, Optional
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LinkedInSeleniumScraper:
    def __init__(self, headless: bool = True):
        """Initialize the LinkedIn scraper with Chrome WebDriver"""
        self.headless = headless
        self.driver = None
        self.wait_timeout = 10
        
    def setup_driver(self):
        """Set up Chrome WebDriver with optimized options"""
        chrome_options = Options()
        
        if self.headless:
            chrome_options.add_argument('--headless')
        
        # Anti-detection options
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        # Window size for better rendering
        chrome_options.add_argument('--window-size=1920,1080')
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            # Execute script to remove webdriver property
            self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set up wait
            self.wait = WebDriverWait(self.driver, self.wait_timeout)
            logger.info("✅ Chrome WebDriver initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to initialize WebDriver: {e}")
            return False
    
    def login_to_linkedin(self, email: str, password: str) -> bool:
        """Login to LinkedIn with credentials"""
        try:
            logger.info("🔐 Logging into LinkedIn...")
            self.driver.get("https://www.linkedin.com/login")
            
            # Wait for login form
            email_field = self.wait.until(
                EC.presence_of_element_located((By.ID, "username"))
            )
            password_field = self.driver.find_element(By.ID, "password")
            
            # Enter credentials
            email_field.send_keys(email)
            password_field.send_keys(password)
            
            # Click login button
            login_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
            login_button.click()
            
            # Wait for redirect (successful login)
            time.sleep(3)
            
            # Check if we're redirected to feed or profile
            current_url = self.driver.current_url
            if "feed" in current_url or "mynetwork" in current_url or "/in/" in current_url:
                logger.info("✅ Successfully logged into LinkedIn")
                return True
            else:
                logger.error("❌ Login failed - still on login page")
                return False
                
        except Exception as e:
            logger.error(f"❌ Login failed: {e}")
            return False
    
    def scrape_recent_activity(self, profile_url: str, max_posts: int = 3) -> List[Dict]:
        """Scrape recent LinkedIn activity from profile"""
        try:
            logger.info(f"📊 Scraping recent activity from: {profile_url}")
            
            # Navigate to profile
            self.driver.get(profile_url)
            time.sleep(3)
            
            # Navigate to activity tab
            activity_url = f"{profile_url.rstrip('/')}/recent-activity/all/"
            self.driver.get(activity_url)
            
            # Wait for content to load
            time.sleep(5)
            
            # Scroll to load more content
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
            
            recent_posts = []
            
            # Try multiple selectors for LinkedIn posts
            post_selectors = [
                '.feed-shared-text',
                '.pv-entity__summary-info',
                '.pv-entity__description',
                '.feed-shared-text__text-view',
                '.activity-item',
                '.feed-shared-update-v2__description'
            ]
            
            for selector in post_selectors:
                try:
                    posts = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if posts:
                        logger.info(f"✅ Found {len(posts)} posts using selector: {selector}")
                        
                        for i, post in enumerate(posts[:max_posts]):
                            try:
                                post_text = post.text.strip()
                                
                                # Filter out empty or very short posts
                                if len(post_text) > 20 and len(post_text) < 500:
                                    # Check if it's not a repost without comment
                                    if not self.is_simple_repost(post_text):
                                        post_data = {
                                            'id': f'activity-{i}',
                                            'content': post_text[:200],  # Limit length
                                            'type': 'post',
                                            'date': datetime.now().strftime('%Y-%m-%d'),
                                            'hasComment': True
                                        }
                                        recent_posts.append(post_data)
                                        
                                        if len(recent_posts) >= max_posts:
                                            break
                                            
                            except Exception as e:
                                logger.warning(f"⚠️ Error processing post {i}: {e}")
                                continue
                        
                        if recent_posts:
                            break
                            
                except NoSuchElementException:
                    continue
            
            logger.info(f"✅ Successfully scraped {len(recent_posts)} recent posts")
            return recent_posts
            
        except Exception as e:
            logger.error(f"❌ Failed to scrape recent activity: {e}")
            return []
    
    def is_simple_repost(self, text: str) -> bool:
        """Check if text is a simple repost without meaningful comment"""
        simple_repost_indicators = [
            'shared a post',
            'liked this',
            'commented on',
            'reacted to',
            'endorsed',
            'viewed your profile'
        ]
        
        text_lower = text.lower()
        for indicator in simple_repost_indicators:
            if indicator in text_lower and len(text) < 50:
                return True
        return False
    
    def get_profile_info(self, profile_url: str) -> Dict:
        """Get basic profile information"""
        try:
            self.driver.get(profile_url)
            time.sleep(3)
            
            # Extract name
            name_selectors = ['h1', '.text-heading-xlarge', '.pv-text-details__left-panel h1']
            name = 'Jai Bhatia'  # Default
            
            for selector in name_selectors:
                try:
                    name_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    name = name_element.text.strip()
                    if name:
                        break
                except:
                    continue
            
            # Extract headline
            headline_selectors = [
                '.text-body-medium',
                '.pv-text-details__left-panel .text-body-medium',
                '.pv-top-card--list-bullet .text-body-medium'
            ]
            headline = 'Sales Engineer & AI Solutions Architect'  # Default
            
            for selector in headline_selectors:
                try:
                    headline_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    headline = headline_element.text.strip()
                    if headline:
                        break
                except:
                    continue
            
            # Extract location
            location_selectors = [
                '.text-body-small.inline',
                '.pv-text-details__left-panel .text-body-small',
                '.pv-top-card--list-bullet .text-body-small'
            ]
            location = 'Los Angeles, CA'  # Default
            
            for selector in location_selectors:
                try:
                    location_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    location = location_element.text.strip()
                    if location:
                        break
                except:
                    continue
            
            return {
                'name': name,
                'headline': headline,
                'location': location
            }
            
        except Exception as e:
            logger.error(f"❌ Failed to get profile info: {e}")
            return {
                'name': 'Jai Bhatia',
                'headline': 'Sales Engineer & AI Solutions Architect',
                'location': 'Los Angeles, CA'
            }
    
    def scrape_linkedin_data(self, profile_url: str, email: str = None, password: str = None) -> Dict:
        """Main method to scrape LinkedIn data"""
        try:
            # Setup driver
            if not self.setup_driver():
                return self.get_fallback_data()
            
            # Login if credentials provided
            if email and password:
                if not self.login_to_linkedin(email, password):
                    logger.warning("⚠️ Login failed, proceeding without authentication")
            else:
                logger.info("ℹ️ No credentials provided, attempting public scraping")
            
            # Get profile info
            profile_info = self.get_profile_info(profile_url)
            
            # Scrape recent activity
            recent_activity = self.scrape_recent_activity(profile_url)
            
            return {
                'name': profile_info['name'],
                'headline': profile_info['headline'],
                'location': profile_info['location'],
                'recentActivity': recent_activity,
                'lastUpdated': datetime.now().isoformat(),
                'note': 'Scraped with Selenium WebDriver'
            }
            
        except Exception as e:
            logger.error(f"❌ Selenium scraping failed: {e}")
            return self.get_fallback_data()
        
        finally:
            if self.driver:
                self.driver.quit()
    
    def get_fallback_data(self) -> Dict:
        """Return fallback data when scraping fails"""
        return {
            'name': 'Jai Bhatia',
            'headline': 'Sales Engineer & AI Solutions Architect | Building the future, one line of code at a time',
            'location': 'Los Angeles, CA',
            'recentActivity': [{
                'id': '1',
                'content': 'The future of QA is AI-powered, but human insight remains irreplaceable',
                'type': 'post',
                'date': datetime.now().strftime('%Y-%m-%d'),
                'hasComment': True
            }],
            'lastUpdated': datetime.now().isoformat(),
            'note': 'Using fallback content - Selenium scraping failed'
        }

def main():
    """Main function for testing the scraper"""
    scraper = LinkedInSeleniumScraper(headless=False)  # Set to True for production
    
    # Test with your LinkedIn profile
    profile_url = "https://www.linkedin.com/in/jaibhatia19/"
    
    # Optional: Add your LinkedIn credentials for authenticated scraping
    email = os.getenv('LINKEDIN_EMAIL')  # Set in environment variables
    password = os.getenv('LINKEDIN_PASSWORD')  # Set in environment variables
    
    result = scraper.scrape_linkedin_data(profile_url, email, password)
    
    # Save result to JSON file
    with open('linkedin_data.json', 'w') as f:
        json.dump(result, f, indent=2)
    
    print("✅ LinkedIn data scraped successfully!")
    print(f"📊 Found {len(result.get('recentActivity', []))} recent activities")
    print(f"📄 Data saved to: linkedin_data.json")

if __name__ == "__main__":
    main()
