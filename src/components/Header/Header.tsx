import React from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Importando os componentes do MUI
import './Header.scss';  // Importe o arquivo de estilização

interface HeaderProps {
    score: number;  // Passa a pontuação atual para o componente
}

const Header: React.FC<HeaderProps> = ({ score }) => {
    // Condição para mudar a cor da pontuação
    const scoreColor = score < 33 ? 'error' : 'success'; // 'error' para vermelho e 'success' para verde

    return (
        <Box className="header-container">
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h4" className="header-title">
                        Quem é?
                    </Typography>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Box className={`score-container ${scoreColor}`}>
                        <Typography variant="h6" className="score-title">
                            Pontos: {score}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Header;