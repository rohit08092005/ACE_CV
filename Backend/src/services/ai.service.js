// const {GoogleGenAI} = require("@google/genai")
// const {z} = require("zod")
// const {zodToJsonSchema} = require("zod-to-json-schema")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// });

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     console.log(JSON.parse(response.text));


// }

// module.exports =  generateInterviewReport


const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer")
//const { zodToJsonSchema } = require("zod-to-json-schema");

const interviewReportJsonSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
    },

    technicalQuestions: {
      type: "array",
      description:
        "Technical questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "The technical question that can be asked in the interview"
          },
          intention: {
            type: "string",
            description:
              "The intention of interviewer behind asking this question"
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },

    behavioralQuestions: {
      type: "array",
      description:
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "The behavioral question that can be asked in the interview"
          },
          intention: {
            type: "string",
            description:
              "The intention of interviewer behind asking this question"
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc."
          }
        },
        required: ["question", "intention", "answer"]
      }
    },

    skillGaps: {
      type: "array",
      description:
        "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The skill which the candidate is lacking"
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "The severity of this skill gap"
          }
        },
        required: ["skill", "severity"]
      }
    },

    preparationPlan: {
      type: "array",
      description:
        "A day-wise preparation plan for the candidate",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            description:
              "The day number in the preparation plan, starting from 1"
          },
          focus: {
            type: "string",
            description:
              "The main focus of this day in the preparation plan"
          },
          tasks: {
            type: "array",
            items: {
              type: "string"
            },
            description:
              "List of tasks to be done on this day"
          }
        },
        required: ["day", "focus", "tasks"]
      }
    },

    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated"
    }
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title"
  ]
};

const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription
}) {
  const prompt = `Generate an interview report for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}`;

  const interaction = await client.interactions.create({
    model: "gemini-3-flash-preview",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: interviewReportJsonSchema
    }
  });

  const report = JSON.parse(interaction.output_text);

 // console.log(report);
 //console.log(JSON.stringify(report, null, 2));

  return report;
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}


// async function generateResumePdf({ resume, selfDescription, jobDescription }) {
//     const resumePdfSchema = z.object({
//         html: z.string().describe(
//             "The HTML content of the resume which can be converted to PDF using Puppeteer"
//         )
//     });

//     const resumePdfJsonSchema = zodToJsonSchema(resumePdfSchema, {
//         $refStrategy: "none"
//     });
//     delete resumePdfJsonSchema.$schema;

//     const prompt = `Generate resume for a candidate with the following details:

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// The response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using Puppeteer.

// The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.

// The HTML content should be well-formatted and structured, making it easy to read and visually appealing.

// The content of resume should not sound like it was generated by AI and should be as close as possible to a real human-written resume.

// You can highlight the content using some colors or different font styles but the overall design should be simple and professional.

// The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.

// The resume should not be too lengthy. It should ideally be 1-2 pages long when converted to PDF.

// Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.`;

//     const interaction = await client.interactions.create({
//         model: "gemini-3-flash-preview",
//         input: prompt,
//         response_format: {
//             type: "text",
//             mime_type: "application/json",
//             schema: resumePdfJsonSchema
//         }
//     });

//     const jsonContent = JSON.parse(interaction.output_text);
//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

//     return pdfBuffer;
// }



//test
async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {

    const resumePdfSchema = {
        type: "object",
        properties: {
            html: {
                type: "string",
                description:
                    "The HTML content of the resume which can be converted to PDF using Puppeteer"
            }
        },
        required: ["html"]
    };

    const prompt = `Generate a professional resume for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

The response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using Puppeteer.

LINK RULES:

Links are extremely important.

NEVER create, guess, infer, modify, complete, or hallucinate a URL.


If the candidate's information contains:

https://github.com/example-user

then use exactly:

<a href="https://github.com/example-user">GitHub</a>

Do NOT change it to:
https://github.com/example
https://github.com/example-user/
https://github.com/Example-User
or any other variation.

The URL must be copied character-for-character from the candidate's input.


The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.

The HTML content should be well-formatted and structured, making it easy to read and visually appealing.

The content of resume should not sound like it was generated by AI and should be as close as possible to a real human-written resume.

You can highlight the content using some colors or different font styles but the overall design should be simple and professional.

The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.

The resume should not be too lengthy. It should ideally be 1-2 pages long when converted to PDF.

Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
`;

    const interaction = await client.interactions.create({
        model: "gemini-3-flash-preview",
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: resumePdfSchema
        }
    });

    const jsonContent = JSON.parse(
        interaction.output_text
    );

    const pdfBuffer = await generatePdfFromHtml(
        jsonContent.html
    );

    return pdfBuffer;
}


module.exports = {
    generateInterviewReport,
    generateResumePdf
};





//module.exports = generateInterviewReport;