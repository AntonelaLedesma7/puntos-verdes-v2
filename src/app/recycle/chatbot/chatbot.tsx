'use client';

import { ChatbotRoute } from '@/app/api/chat/route';
import styles from '@/styles/chatbot.module.css'; 
import { useState } from 'react';

interface Response {
  text: string;
  type: 'user' | 'bot';
}

interface ChatComponentProps {
  onClose: () => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ onClose }) => {
  const [question, setQuestion] = useState<string>('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState<boolean>(true);

  const predefinedQuestions: string[] = [
    '¿Cómo clasificar plásticos?',
    '¿Qué tipo de vidrio puedo reciclar?',
    '¿Dónde puedo reciclar cartón?',
    '¿Cómo canjear mis puntos?',
    '¿Cómo clasifico el papel?'
  ];

  const handleAsk = async (userQuestion: string): Promise<void> => {
    if (!userQuestion) return;

    setLoading(true);
    setResponses(prev => [...prev, { text: userQuestion, type: 'user' }]);

    try {
      const res = await fetch('http://localhost:3002/api/chatbot/ask', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }), 
      });

      if (!res.ok) {
        throw new Error('Error en la respuesta del servidor.');
      }

      const data = await res.json();
      setResponses(prev => [...prev, { text: data.answer, type: 'bot' }]);
    } catch (error) {
      setResponses(prev => [...prev, { text: 'Error: ' + (error as Error).message, type: 'bot' }]);
    } finally {
      setLoading(false);
      setQuestion('');
      setShowPredefinedQuestions(false); 
    }
  };

  const handlePredefinedQuestionClick = (predefinedQuestion: string): void => {
    setQuestion(predefinedQuestion);
    handleAsk(predefinedQuestion);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.recycleContainer}>
        <h2 className="text-2xl mb-4">Greene Helper</h2>
        
        <div className={styles.chatContainer}>
          <div className={styles.messages}>
            {responses.map((response, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${response.type === 'user' ? styles.userMessage : styles.botMessage}`}
              >
                {response.text}
              </div>
            ))}
            {loading && <div className={`${styles.message} ${styles.botMessage}`}>Cargando...</div>}
          </div>
        </div>

        {showPredefinedQuestions && (
          <div className={styles.predefinedQuestions}>
            {predefinedQuestions.map((predefinedQuestion, index) => (
              <button 
                key={index} 
                className={styles.questionButton} 
                onClick={() => handlePredefinedQuestionClick(predefinedQuestion)}
              >
                {predefinedQuestion}
              </button>
            ))}
          </div>
        )}

        <textarea
          className={styles.chatInput}
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (e.target.value !== '') {
              setShowPredefinedQuestions(false);
            }
          }}
          placeholder="Escribe tu pregunta..."
        />

        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
          <button className={styles.sendButton} onClick={() => handleAsk(question)}>Enviar</button>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
