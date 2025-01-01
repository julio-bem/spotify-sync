describe('Full Navigation Flow', () => {
    it('logs in, navigates through the app and creates a playlist', () => {
        cy.visit('/');
        
        cy.get('button').contains('Entrar').click();
        
// O redirecionamento do Spotify com um token de acesso foi simulado através de um mock que é obtido manualmente.
// Tendo em vista, que não é possível automatizar o sistema de autenticação do Spotify para obter o token,
// essa foi a forma que encontrei de simular o comportamento real com maior precisão sem mockar as chamadas a API.

        const accessToken = 'BQAY7P107iyXLARg2CF-_5eXJ2i45rNTLFUKINUIySceKNtr6wiZwqq_5mKLWJ-M9pveQ8BYICHB7V4zkrIKWK05kRmRi04ktLVJ3uPhS1rfByel7y4pVxBgk53x5verhLxSLpfVL_m4cTYlpWqasDHCxKHsDDfCVpL3KYmBqBhhnt6Bj3vGs5CZ8bgNWDJvCItveCQJIbbHx4OAitAtytL_eeDG7rLb78yLRJ7jpl7wBRcZJ_W4lDzQ0JcHoaXDDmm_MsNrl9PCKl8MvpK9_yrYqUbcXcriRTW_3Fy5xiE'; // Type here the access token
        const expiresIn = '3600';
        
        cy.visit(`/home#access_token=${accessToken}&token_type=Bearer&expires_in=${expiresIn}`);
            
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
  