import React from "react";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

interface IQA {
  question: string;
  answer: string;
}

const QA = ({ qa }: { qa: IQA[] }) => {
  return (
    <main className="flex w-auto flex-1 flex-col items-center justify-center px-20 text-center mt-8">
      <Card>
        <Card.Header>
          <Text b>Pregunta</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>
            {qa.map(x => x.question)}
          </Text>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="flex-end">
            <Button size="sm" color="gradient">Agree</Button>
          </Row>
        </Card.Footer>
      </Card>
    </main>
  );
};

export { QA };
