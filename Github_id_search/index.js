
class GitHubUserSearch {
    constructor() {
        this.API_URL = 'https://api.github.com/users/';
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        // Input and button elements
        this.usernameInput = document.getElementById('username');
        this.searchButton = document.getElementById('searchBtn');
        
        // Status elements
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
        this.profileElement = document.getElementById('profile');
        
        // Profile information elements
        this.avatarElement = document.getElementById('avatar');
        this.nameElement = document.getElementById('name');
        this.loginElement = document.getElementById('login');
        this.bioElement = document.getElementById('bio');
        this.locationElement = document.getElementById('location');
        this.createdElement = document.getElementById('created');
        this.reposElement = document.getElementById('repos');
        this.followersElement = document.getElementById('followers');
        this.followingElement = document.getElementById('following');
        this.profileLinkElement = document.getElementById('profile-link');
    }

    addEventListeners() {
        this.searchButton.addEventListener('click', () => this.searchUser());
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchUser();
            }
        });
    }

    showLoading(show) {
        this.loadingElement.style.display = show ? 'flex' : 'none';
    }

    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = 'block';
        this.profileElement.classList.add('hidden');
    }

    clearError() {
        this.errorElement.style.display = 'none';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    async searchUser() {
        const username = this.usernameInput.value.trim();
        
        if (!username) {
            this.showError('Please enter a username');
            return;
        }

        this.clearError();
        this.showLoading(true);
        this.profileElement.classList.add('hidden');

        try {
            const response = await fetch(`${this.API_URL}${username}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching user data');
            }

            this.displayUserData(data);
        } catch (error) {
            this.showError(error.message === 'Not Found' 
                ? 'User not found' 
                : 'Error fetching user data');
        } finally {
            this.showLoading(false);
        }
    }

    displayUserData(user) {
        // Update profile elements
        this.avatarElement.src = user.avatar_url;
        this.nameElement.textContent = user.name || user.login;
        this.loginElement.textContent = `@${user.login}`;
        this.bioElement.textContent = user.bio || 'No bio available';
        this.locationElement.textContent = user.location 
            ? `📍 ${user.location}` 
            : 'Location not specified';
        this.createdElement.textContent = `Joined ${this.formatDate(user.created_at)}`;
        this.reposElement.textContent = user.public_repos;
        this.followersElement.textContent = user.followers;
        this.followingElement.textContent = user.following;
        
        // Update profile link
        this.profileLinkElement.href = user.html_url;
        
        // Show the profile
        this.profileElement.classList.remove('hidden');
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubUserSearch();
});