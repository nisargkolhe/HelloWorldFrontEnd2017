import { User } from './user';

export class Application {
    id: number;
    user_id: string;
    class_year: string;
    grad_year: string;
    major: string;
    referral: string;
    hackathon_count: number;
    dietary_restrictions: string;
    shirt_size: string;
    website: string;
    longanswer_1: string;
    longanswer_2: string;
    status: string;
    emailSent: boolean;
    created_at:Date;
    updated_at:Date;
    resume: File;
    status_internal: string;
    status_public: string;
    user: User;

    public static getMajors(){
      return MAJORS;
    }
}

const MAJORS: string[] = [
  "Accounting",
  "Acting",
  "Actuarial Science",
  "Aeronautical and Astronautical Engineering",
  "Aeronautical Engineering Technology",
  "Aerospace Financial Analysis",
  "African American Studies",
  "Agribusiness (multiple concentrations)",
  "Agricultural Communication",
  "Agricultural Economics (multiple concentrations)",
  "Agricultural Education",
  "Agricultural Engineering",
  "Agricultural Systems Management",
  "Agronomy (multiple concentrations)",
  "Airline Management and Operations",
  "Airport Management and Operations",
  "American Studies",
  "Animal Sciences (multiple concentrations)",
  "Animation",
  "Anthropology",
  "Applied Exercise and Health (Pre)",
  "Applied Meteorology and Climatology",
  "Art History",
  "Asian Studies",
  "Athletic Training (Pre)",
  "Atmospheric Science/Meteorology",
  "Audio Engineering Technology",
  "Automation and Systems Integration Engineering Technology",
  "Aviation Management",
  "Biochemistry",
  "Biochemistry (Biology)",
  "Biochemistry (Chemistry)",
  "Biological Engineering - multiple concentrations",
  "Biology",
  "Biomedical Engineering",
  "Brain and Behavioral Sciences",
  "Building Information Modeling",
  "Cell, Molecular, and Developmental Biology",
  "Chemical Engineering",
  "Chemistry",
  "Chemistry - American Chemical Society",
  "Chinese Studies",
  "Civil Engineering",
  "Classical Studies",
  "Communication, General (Pre)",
  "Comparative Literature",
  "Computer and Information Technology",
  "Computer Engineering",
  "Computer Science",
  "Construction Engineering",
  "Construction Management Technology",
  "Creative Writing",
  "Crop Science",
  "Cybersecurity",
  "Data Science",
  "Data Visualization",
  "Design and Construction Integration",
  "Developmental and Family Science",
  "Early Childhood Education and Exceptional Needs",
  "Ecology, Evolution, and Environmental Sciences",
  "Economics (Pre) (College of Liberal Arts)",
  "Economics (School of Management)",
  "Effects Technical Direction",
  "Electrical Engineering",
  "Electrical Engineering Technology",
  "Elementary Education",
  "Engineering / Technology Teacher Education",
  "English",
  "Environmental and Ecological Engineering",
  "Environmental and Natural Resources Engineering",
  "Environmental Geosciences",
  "Environmental Health Sciences",
  "Environmental Studies (Pre)",
  "Exploratory Studies (for undecided students)",
  "Family and Consumer Sciences Education",
  "Farm Management",
  "Film and Theatre Production",
  "Film and Video Studies",
  "Finance",
  "Financial Counseling and Planning",
  "Fisheries and Aquatic Sciences",
  "Flight (Professional Flight Technology)",
  "Foods and Nutrition in Business",
  "Food Science",
  "Forestry",
  "French",
  "Game Development and Design",
  "General Education: Curriculum and Instruction (non-licensure)",
  "General Education: Educational Studies (non-licensure)",
  "Genetic Biology",
  "Geology and Geophysics",
  "German",
  "Global Studies",
  "Health and Disease",
  "Health Sciences - Preprofessional",
  "History",
  "Horticulture (multiple concentrations)",
  "Hospitality and Tourism Management",
  "Human Resource Development",
  "Human Services",
  "Industrial (Consumer Product) Design",
  "Industrial Engineering",
  "Industrial Engineering Technology",
  "Industrial Management",
  "Insect Biology",
  "Integrated Studio Arts",
  "Interdisciplinary Engineering Studies",
  "Interior (Space Planning) Design",
  "Italian Studies",
  "Japanese",
  "Jewish Studies",
  "Kinesiology",
  "Landscape Architecture (Pre)",
  "Law and Society",
  "Learning Sciences in Educational Studies (non licensure)",
  "Linguistics",
  "Management (General)",
  "Marketing",
  "Materials Engineering",
  "Mathematics",
  "Mathematics Education",
  "Mechanical Engineering",
  "Mechanical Engineering Technology",
  "Mechatronics Engineering Technology",
  "Medical Laboratory Sciences",
  "Medieval and Renaissance Studies",
  "Microbiology",
  "Multidisciplinary Engineering",
  "Natural Resources and Environmental Science (multiple concentrations)",
  "Network Engineering Technology",
  "Neurobiology and Physiology",
  "Nuclear Engineering",
  "Nursing",
  "Nutrition, Fitness, and Health",
  "Nutrition and Dietetics",
  "Nutrition and Dietetics/Nutrition, Fitness and Health (dual major)",
  "Nutrition Science",
  "Occupational Health Science",
  "Organizational Leadership",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Planetary Sciences",
  "Plant Genetics, Breeding, and Biotechnology",
  "Plant Science",
  "Political Science",
  "Predentistry",
  "Prelaw",
  "Premedicine",
  "Preoccupational Therapy",
  "Prephysical Therapy",
  "Prephysician's Assistant",
  "Pre-veterinary Medicine",
  "Professional Writing",
  "Psychological Sciences",
  "Public Health",
  "Purdue Polytechnic Institute Statewide Programs",
  "Radiological Health Sciences - Health Physics",
  "Radiological Health Sciences - Pre-Medical Physics",
  "Religious Studies",
  "Retail Management",
  "Robotics Engineering Technology",
  "Russian",
  "Sales and Marketing",
  "Science Education (Biology, Chemistry, Earth/Space, Physics)",
  "Selling and Sales Management",
  "Social Studies Education",
  "Sociology",
  "Soil and Water Sciences",
  "Sound for the Performing Arts",
  "Spanish",
  "Special Education: Dual Licensure in Elementary Education and Special Education - Mild Intervention",
  "Special Education: Mild and Intense Intervention P-12",
  "Special Education: Mild Intervention P-12",
  "Speech, Language, and Hearing Sciences",
  "Statistics - Applied Statistics",
  "Statistics with Mathematics Option",
  "Studio Arts and Technology",
  "Supply Chain Information and Analytics",
  "Supply Chain Management Technology",
  "Sustainable Biomaterials – Process and Product Design",
  "Sustainable Food and Farming Systems",
  "Systems Analysis and Design",
  "Theatre",
  "Theatre Design and Production",
  "Transdisciplinary Studies in Engineering Technology",
  "Transdisciplinary Studies in Technology",
  "Turf Management and Science",
  "Undecided Liberal Arts",
  "Undecided within Engineering",
  "Unmanned Aerial Systems",
  "UX Design",
  "Veterinary Technician or Technologist",
  "Virtual Product Integration",
  "Visual Arts Design Education",
  "Visual Arts Education",
  "Visual Communications Design",
  "Visual Effects Compositing",
  "Web Programming and Design",
  "Wildlife",
  "Women’s, Gender and Sexuality Studies"
];
