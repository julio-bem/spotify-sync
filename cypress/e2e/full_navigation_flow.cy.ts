describe('Full Navigation Flow', () => {

    it('logs in, navigates through the app and creates a playlist', () => {
        cy.visit('/');

        // Substitua pelo token de acesso para simular o retorno da API do Spotify
        const accessToken = '';
        const tokenType = 'Bearer';
        const expiresIn = '3600';
    
        cy.window().then((window) => {
          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('tokenType', tokenType);
          window.localStorage.setItem('expiresIn', expiresIn);
        });
        
        cy.visit(`/home`);

        cy.url().should('include', '/home');
        
        cy.get('p').contains('Artistas').click();
        cy.url().should('include', '/artists');

        cy.get('[data-testid="artist-list"]').should('be.visible');

        cy.get('[data-testid="artist-item"]').first().click();
        cy.url().should('include', '/artist/');

        cy.get('[data-testid="artist-details"]').should('be.visible');

        cy.get('[data-testid="album-list"]').should('be.visible');
        cy.get('[data-testid="album"]').should('be.visible');

        cy.get('p').contains('Playlists').click();
        cy.url().should('include', '/playlists');

        cy.get('[data-testid="playlist-list-item"]').should('be.visible');

        cy.get('button').contains('Criar playlist').click();
        cy.get('input[placeholder="Nome da playlist"]').type('Nova Playlist');
        cy.get('button').contains(/^Criar$/).click();

        cy.contains('Nova Playlist').should('exist');
        });
  });
  