const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
// 3 arrays with information pertaining to each category: manager, engineer, intern
  const interns = [];
  const managers = [];
  const engineers = [];

  employees.forEach(employee => {
    const role = employee.getRole();
      if (role === "Manager") {
        managers.push(renderManager(employee))
      }
      else if (role === "Engineer") {
        engineers.push(renderEngineer(employee))      
      }
      else if (role === "Intern") {
        interns.push(renderIntern(employee))      
      }  
  })

  let managersshtml = '<div class="row justify-content-center">';
  managers.forEach(manager => {
    managersshtml += manager
  })
  managersshtml += "</div>"

  let engineershtml = '<div class="row justify-content-center">';
  engineers.forEach(engineer => {
    engineershtml += engineer
  })
  engineershtml += "</div>"

  let internshtml = '<div class="row justify-content-center">';
  interns.forEach(intern => {
    internshtml += intern
  })
  internshtml += "</div>"

  const html2 = managersshtml + engineershtml + internshtml;
  return renderMain(html2);
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
