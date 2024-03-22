// QuestionList.js
import React from "react";

function QuestionList({ questions, onDelete, onEdit }) {
    return (
        <section>
            <h1>Quiz Questions</h1>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.prompt}
                        <button className="question-button" onClick={() => onEdit(question.id)}>Edit</button>
                        <button className="question-button" onClick={() => onDelete(question.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default QuestionList;