import React, { useState } from "react";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { supabase } from "../lib/supabase";

interface IQA {
  question: string;
  answer: string;
}

const QA = (question:  IQA ) => {
    const [answers, setAnswers] = useState(false)
    const onClickAnswer = () => {
        setAnswers(true)
    }
  return (
    <Card>
      <Card.Header>
        <Text>Pregunta</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$10" }}>
        {question.question}
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="flex-end">
        <Text className={answers ? 'text-green-500' : 'hidden'}>{question.answer}</Text>
        {!answers && <Button size="sm" color="gradient" onClick={() => onClickAnswer()}>
            Respuesta
          </Button>}
          
        </Row>
      </Card.Footer>
    </Card>
  );
};

export { QA };
