const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const INSTANCE_ID = 'instance125215';
const TOKEN = '2eqrzt4ys5tln3st';
const WHATSAPP_NUMBER = '5592981648376'; // ex: 5599999999999

app.post('/api/agendar', async (req, res) => {
  const { nome, telefone, data, hora, servico } = req.body;

  if (!nome || !telefone || !data || !hora || !servico) {
    return res.status(400).json({ success: false, message: 'Faltando dados no formulário.' });
  }

  const mensagem = 
    `Novo agendamento!%0A` +
    `Nome: ${nome}%0A` +
    `Telefone: ${telefone}%0A` +
    `Data: ${data}%0A` +
    `Hora: ${hora}%0A` +
    `Serviço: ${servico}`;

  try {
    const url = `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`;
    const response = await axios.post(url, {
      token: TOKEN,
      to: WHATSAPP_NUMBER,
      body: mensagem,
    });

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'Erro ao enviar mensagem no WhatsApp.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor rodando na porta ${PORT}`));

