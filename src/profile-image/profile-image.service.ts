import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProfileImageService {
    async generateProfileImage(name: string): Promise<string> {
        const words = name.trim().split(' '); // Remove espaços extras e divide o nome
        const initials = words.length > 1
            ? `${words[0][0]}${words[1][0]}` // Pega a inicial do primeiro e do segundo nome
            : words[0][0]; // Caso o nome tenha só uma palavra

        const canvas = createCanvas(500, 500);
        const context = canvas.getContext('2d');

        // Fundo da imagem
        context.fillStyle = '#1A1B1D';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Adicionar as iniciais ao centro da imagem
        context.font = 'bold 200px Arial';
        context.fillStyle = '#FFFFFF';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(initials.toUpperCase(), canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL('image/png');
    }

}
