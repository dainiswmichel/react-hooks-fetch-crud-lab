// QuestionForm.js
import React, { useState, useEffect } from "react";
import '../index.css';

function QuestionForm({ onSubmit, question }) {
   const [formData, setFormData] = useState({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
   });

   useEffect(() => {
      if (question) {
         setFormData({
            prompt: question.prompt,
            answer1: question.answers[0],
            answer2: question.answers[1],
            answer3: question.answers[2],
            answer4: question.answers[3],
            correctIndex: question.correctIndex,
         });
      }
   }, [question]);

   const handleChange = (event) => {
      setFormData({
         ...formData,
         [event.target.name]: event.target.value,
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({
         prompt: formData.prompt,
         answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
         correctIndex: parseInt(formData.correctIndex),
      });
   };

   return (
      <section>
      <form onSubmit={handleSubmit}>
         <label>
            Prompt:
            <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} required />
         </label>
         <label>
            Answer 1:
            <input type="text" name="answer1" value={formData.answer1} onChange={handleChange} required />
         </label>
         <label>
            Answer 2:
            <input type="text" name="answer2" value={formData.answer2} onChange={handleChange} required />
         </label>
         <label>
            Answer 3:
            <input type="text" name="answer3" value={formData.answer3} onChange={handleChange} required />
         </label>
         <label>
            Answer 4:
            <input type="text" name="answer4" value={formData.answer4} onChange={handleChange} required />
         </label>
         <label>
            Correct Answer Index (0-3):
            <input type="number" min="0" max="3" name="correctIndex" value={formData.correctIndex} onChange={handleChange} required />
         </label>
         <button type="submit">Submit</button>
      </form>
      </section>
   );
}

export default QuestionForm;