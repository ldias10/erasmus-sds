# Erasmus-sds Project
This Erasmus+ project aims to develop a platform, designed to assist Erasmus+ students in selecting courses for their Learning Agreement (LA). The main problem addressed by the project is the difficulty students face in deciding which courses to include in their LA. This sotware will offer features such as presenting a list of available courses with official descriptions, including links to ECTS details, as well as showcasing comments and reviews from other Erasmus+ students about the courses. Additionally, students can comment on courses, add materials, and create their Learning Agreement within the platform. They can manage their selection by adding or deleting courses to a virtual basket and export their finalized Learning Agreement as a document.


## Roles and responsibilities
**Scrum Master (Luís Dias) is responsible for:**
+ Coaching the team members in self-management and cross-functionality;
+ Helping the Scrum Team focus on creating high-value Increments that meet the Definition of Done;
+ Causing the removal of impediments to the Scrum Team’s progress;
+ Ensuring that all Scrum events take place and are positive, productive, and kept within the timebox.
+ Removing barriers between stakeholders and Scrum Team.


**Product Owner (Vitor Pererira) is responsible for:**
+ Developing and explicitly communicating the Product Goal;
+ Creating and clearly communicating Product Backlog items;
+ Ordering Product Backlog items;
+ Ensuring that the Product Backlog is transparent, visible and understood.

**Developer (Erwann Gauthier) is responsible for:**
+ Creating a plan for the Sprint, the Sprint Backlog;
+ Instilling quality by adhering to a Definition of Done;
+ Adapting their plan each day toward the Sprint Goal;
+ Holding each other accountable as professionals.

**Developer (Lucas Butery) is responsible for:**
+ Creating a plan for the Sprint, the Sprint Backlog;
+ Instilling quality by adhering to a Definition of Done;
+ Adapting their plan each day toward the Sprint Goal;
+ Holding each other accountable as professionals.


## Communication strategies
Our communication strategy is flexible and adapted to the needs of our team. We will utilize both online and in-person meetings to ensure effective collaboration.
For more critical meetings such as sprint plannings or milestone discussions, we will convene at the Poznan University of Technology. These face-to-face reunions will allow for in-depth discussions and decision-making.
For smaller tasks or routine updates, we will utilize online platforms like Discord or Google Meets. These virtual meetings will enable us to efficiently address smaller issues and keep the project moving forward.

## Installation manual
### Backend
You must have a PostgreSQL Database running and a .env file with APP_HOST, APP_PORT, DATABASE_URL, JWT_SECRET, COOKIES_SECRET variables set.
```sh
npm install
npx prisma migrate dev --name init
npm run build
npm run start
```
