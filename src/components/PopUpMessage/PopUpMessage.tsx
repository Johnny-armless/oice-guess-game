import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

interface PopupMessageProps {
    open: boolean; // Controla se o pop-up está aberto ou não
    onClose: () => void; // Função para fechar o pop-up
    message: string; // Mensagem a ser exibida
}

const PopupMessage: React.FC<PopupMessageProps> = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Mensagem</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopupMessage;