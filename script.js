/* DigiManage – Impact of Digital Technology on Modern Management */

const eras = [
  {y:'1900s', t:'Classical', d:'Scientific management (Taylor) and administrative theory (Fayol). Work was manual, paper-based and strictly supervised.', p:['Time and motion studies','Rigid hierarchy','Paper records and manual reporting']},
  {y:'1950s', t:'Behavioural', d:'Focus shifted to people. Human relations and motivation theories shaped management.', p:['Employee motivation','Group dynamics','Mainframe computers appear in large firms']},
  {y:'1990s', t:'Computer Age', d:'Personal computers, ERP systems and email speeded up information flow and decision making.', p:['ERP and MIS adoption','Email and intranet','Process re-engineering']},
  {y:'2010s+', t:'Digital Age', d:'Cloud, mobile, big data, AI and automation enable real-time, data-driven and remote management.', p:['Real-time analytics and dashboards','Remote and hybrid teams','AI-assisted decisions and automation']}
];

const fns = {
  Planning:{icon:'🧭', before:['Forecasts based on past experience','Annual plans, slow to change','Limited data for decisions'], after:['Predictive analytics and AI forecasting','Scenario simulation and agile planning','Real-time market and customer data'], tools:'Power BI, Tableau, Google Analytics, AI forecasting'},
  Organizing:{icon:'🏢', before:['Tall hierarchies with many levels','Fixed office and fixed hours','Manual allocation of work'], after:['Flat, network-based structures','Remote, hybrid and global teams','Automated workflow and task allocation'], tools:'Slack, Microsoft Teams, Trello, Jira, Cloud ERP'},
  Leading:{icon:'🚀', before:['Face-to-face instructions','One-way communication','Annual appraisal and feedback'], after:['Instant multi-channel communication','Two-way feedback and e-engagement','Continuous performance tracking'], tools:'Zoom, Slack, LinkedIn Learning, HR analytics'},
  Controlling:{icon:'📊', before:['Periodic manual reports','Problems found after they occur','Heavy paperwork and audits'], after:['Live dashboards and KPIs','Alerts and early-warning systems','Automated compliance and audit trails'], tools:'KPI dashboards, ERP, IoT sensors, RPA'}
};

const techs = [
  {i:'🤖', n:'Artificial Intelligence', d:'Machines that learn from data to predict and recommend.', u:'Used for demand forecasting, resume screening and chatbots.'},
  {i:'☁️', n:'Cloud Computing', d:'On-demand storage and software over the internet.', u:'Lets teams share files and run systems from anywhere.'},
  {i:'📈', n:'Big Data Analytics', d:'Analysis of very large datasets to find patterns.', u:'Helps managers understand customers and market trends.'},
  {i:'📡', n:'Internet of Things', d:'Connected devices that send real-time data.', u:'Tracks machines, stock and delivery vehicles live.'},
  {i:'💬', n:'Collaboration Tools', d:'Platforms for chat, video and shared documents.', u:'Supports remote teams, meetings and project tracking.'},
  {i:'⚙️', n:'Automation (RPA)', d:'Software robots that perform repetitive tasks.', u:'Automates payroll, invoicing and report generation.'}
];

const cmp = [
  ['Decisions','Based on intuition and experience','Based on data and analytics'],
  ['Communication','Memos, meetings, phone calls','Instant chat, video and email'],
  ['Structure','Tall hierarchy, fixed location','Flat, flexible and remote'],
  ['Speed','Slow, paper-based approvals','Fast, automated workflows'],
  ['Control','Periodic manual reports','Real-time dashboards'],
  ['Employees','Supervised and task-oriented','Empowered and skill-oriented']
];

const pros = ['Faster and better-informed decisions','Lower operating costs through automation','Better communication and teamwork across locations','Improved customer service and personalisation','Real-time monitoring and control of performance','Greater flexibility and productivity for employees'];
const cons = ['High initial cost of technology and training','Cyber-security and data privacy risks','Resistance to change from employees','Risk of job displacement through automation','Over-dependence on technology and system failure','Digital skills gap among managers and staff'];

const questions = [
  ['Planning','Decisions in the organization are made using data and analytics.'],
  ['Planning','Goals and plans are reviewed and updated frequently using live information.'],
  ['Organizing','Teams can work remotely using cloud and collaboration tools.'],
  ['Organizing','Routine tasks and workflows are automated.'],
  ['Leading','Managers communicate with employees through digital channels.'],
  ['Leading','Employees receive regular digital training and feedback.'],
  ['Controlling','Performance is tracked through real-time dashboards or KPIs.'],
  ['Controlling','Strong cyber-security and data-protection policies are in place.']
];

const $ = id => document.getElementById(id);
const li = a => a.map(x => `<li>${x}</li>`).join('');

/* Hero counters */
document.querySelectorAll('[data-n]').forEach(el => {
  const end = +el.dataset.n; let c = 0;
  const t = setInterval(() => { el.textContent = ++c; if (c >= end) clearInterval(t); }, 150);
});

/* Timeline */
function showEra(k) {
  document.querySelectorAll('.era').forEach((e, i) => e.classList.toggle('on', i === k));
  const e = eras[k];
  $('eraInfo').innerHTML = `<h3>${e.t} Era (${e.y})</h3><p>${e.d}</p><ul>${li(e.p)}</ul>`;
}
$('timeline').innerHTML = eras.map((e, i) => `<div class="era" onclick="showEra(${i})"><small>${e.y}</small><h4>${e.t}</h4></div>`).join('');
showEra(3);

/* Function tabs */
function showFn(name) {
  document.querySelectorAll('#fnTabs button').forEach(b => b.classList.toggle('on', b.dataset.k === name));
  const f = fns[name];
  $('fnPanel').innerHTML = `
    <div><h3>${f.icon} ${name} – Before</h3><ul>${li(f.before)}</ul></div>
    <div><h3>${f.icon} ${name} – With Digital Technology</h3><ul>${li(f.after)}</ul></div>
    <div style="grid-column:1/-1;color:#fbbf24">🛠 Common tools: ${f.tools}</div>`;
}
$('fnTabs').innerHTML = Object.keys(fns).map(k => `<button data-k="${k}" onclick="showFn('${k}')">${fns[k].icon} ${k}</button>`).join('');
showFn('Planning');

/* Technology cards */
$('techGrid').innerHTML = techs.map(t => `<div class="tc" onclick="this.classList.toggle('open')"><div class="ic">${t.i}</div><h3>${t.n}</h3><p>${t.d}</p><div class="use">${t.u}</div></div>`).join('');

/* Comparison slider */
function drawCmp() {
  const v = +$('slider').value;
  $('cmp').innerHTML = cmp.map(r => `<div class="row"><b>${r[0]}</b><span style="color:${v > 50 ? '#2dd4bf' : '#fbbf24'}">${v > 50 ? '💻 ' + r[2] : '📄 ' + r[1]}</span></div>`).join('');
}
$('slider').oninput = drawCmp; drawCmp();

/* Assessment */
const ans = Array(questions.length).fill(0);
$('quiz').innerHTML = questions.map((q, i) => `
  <div class="q"><p><b>${i + 1}.</b> ${q[1]}</p>
  <div class="opts">${[1,2,3,4,5].map(n => `<button onclick="pick(${i},${n},this)">${n}</button>`).join('')}</div></div>`).join('')
  + '<button class="sbtn" id="calc" disabled onclick="calcScore()">Calculate Digital Maturity</button>';

function pick(i, n, btn) {
  ans[i] = n;
  btn.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  $('calc').disabled = ans.includes(0);
}

function calcScore() {
  const total = ans.reduce((a, b) => a + b, 0), pct = Math.round(total / 40 * 100);
  const level = pct >= 80 ? ['Digital Leader', 'The organization uses technology strategically in all functions.']
              : pct >= 60 ? ['Digital Adopter', 'Good use of technology, with room to integrate more deeply.']
              : pct >= 40 ? ['Digital Beginner', 'Some tools are in use; a clear digital strategy is needed.']
              : ['Traditional', 'The organization relies mostly on traditional methods and should start digital transformation.'];
  const per = {};
  questions.forEach((q, i) => per[q[0]] = (per[q[0]] || 0) + ans[i]);
  $('result').hidden = false;
  $('result').innerHTML = `<div class="score">${pct}%</div><h3>${level[0]}</h3><p>${level[1]}</p><br>`
    + Object.keys(per).map(k => `<div class="bar"><b>${k}</b> – ${per[k]}/10<i><u style="width:0" data-w="${per[k] * 10}%"></u></i></div>`).join('');
  setTimeout(() => document.querySelectorAll('.bar u').forEach(u => u.style.width = u.dataset.w), 50);
  $('result').scrollIntoView({behavior: 'smooth', block: 'center'});
}

/* Pros and cons */
$('pros').innerHTML = li(pros);
$('cons').innerHTML = li(cons);
