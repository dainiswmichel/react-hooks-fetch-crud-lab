// App.js
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
 const [page, setPage] = useState("List");
 const [questions, setQuestions] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const [editingQuestion, setEditingQuestion] = useState(null); // New state variable for the question being edited

 const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/questions');
      if (!response.ok) {
        throw new Error('Something went wrong while fetching the questions');
      }
      const data = await response.json();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.toString());
      setIsLoading(false);
    }
 };

 useEffect(() => {
    fetchQuestions();
 }, []);

 const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete question');
    }

    // Refetch the questions after a question is deleted
    fetchQuestions();
  } catch (error) {
    console.error('Error:', error);
  }
};

 const handleNewQuestion = () => {
    setPage("Form");
    setEditingQuestion(null); // Reset the editingQuestion state when adding a new question
 };

 const handleEdit = (id) => {
  const questionToEdit = questions.find((question) => question.id === id);
  setEditingQuestion(questionToEdit);
  setPage("Form");
 };

 const handleFormSubmit = async (formData) => {
    const method = editingQuestion ? 'PATCH' : 'POST'; // Use PATCH method if editing a question, otherwise use POST
    const url = editingQuestion ? `http://localhost:4000/questions/${editingQuestion.id}` : 'http://localhost:4000/questions';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      // Refetch the questions after a new question is added or an existing question is edited
      fetchQuestions();
      setPage("List");
    } catch (error) {
      console.error('Error:', error);
    }
 };

 if (isLoading) {
    return <div>Loading...</div>;
 }

 if (error) {
    return <div>Error: {error}</div>;
 }

 return (
  <main>
    <AdminNavBar onChangePage={setPage} />
    {page === "Form" ? (
      <QuestionForm onSubmit={handleFormSubmit} question={editingQuestion} /> // Pass the question being edited to the QuestionForm component
    ) : (
      <>
        <QuestionList questions={questions} onDelete={handleDelete} onEdit={handleEdit} /> {/* Pass the onEdit prop to the QuestionList component */}
        <button onClick={handleNewQuestion}>New Question</button>
      </>
    )}
  </main>
);
}

export default App;