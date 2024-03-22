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

 const fetchQuestions = () => {
    setIsLoading(true);
    fetch('http://localhost:4000/questions')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong while fetching the questions');
      })
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
 };

 useEffect(() => {
    fetchQuestions();
 }, []);

 const handleNewQuestion = () => {
    setPage("Form");
 };

 const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      await fetchQuestions();
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
        <QuestionForm onSubmit={handleFormSubmit} />
      ) : (
        <>
          <QuestionList questions={questions} />
          <button onClick={handleNewQuestion}>New Question</button>
        </>
      )}
    </main>
 );
}

export default App;