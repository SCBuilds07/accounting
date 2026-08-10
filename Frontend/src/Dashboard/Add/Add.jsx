import { useState } from 'react'
import { GRAPH_CONFIGS } from './GRAPH_CONFIG'
import './Add.css'

export default function Add() {
    const [selectedGraph, setSelectedGraph] = useState(null)
    const [answers, setAnswers] = useState({})

    function handleSelectGraph(graphName) {
        setSelectedGraph(graphName)
        setAnswers({})
    }

    function handleAnswerChange(questionId, value) {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value
        }))
    }

    function handleSubmit() {
        // console.log("Antwoorden:", answers)
        // alert(currentGraph["graph_type"])
        if (currentGraph["graph_type"] === "bar") {
            alert("BARRSS")
        }
    }

    const currentGraph = selectedGraph ? GRAPH_CONFIGS[selectedGraph] : null

    return (
        <section id='add'>
            <h1>Welke wil je?</h1>
            <menu>
                {Object.keys(GRAPH_CONFIGS).map((graphName) => (
                    <button key={graphName} onClick={() => handleSelectGraph(graphName)}>
                        {graphName}
                    </button>
                ))}
            </menu>

            {currentGraph && (
                <div className='add'>
                    <h2>{selectedGraph}</h2>
                    {currentGraph.questions.map((question) => (
                        <div key={question.id} className="question">
                            <label htmlFor={question.id}>{question.label}</label>
                            <input
                                id={question.id}
                                type={question.type}
                                value={answers[question.id] || ""}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={() => handleSubmit(currentGraph)}>Opslaan</button>
                </div>
            )}
        </section>
    )
}