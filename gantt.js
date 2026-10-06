(function () {
  "use strict";

  var START = new Date(2026, 7, 1);
  var END = new Date(2027, 0, 31);
  var TOTAL = Math.round((END - START) / 86400000) + 1;

  var MONTHS = [
    { label: "Август", days: 31 },
    { label: "Сентябрь", days: 30 },
    { label: "Октябрь", days: 31 },
    { label: "Ноябрь", days: 30 },
    { label: "Декабрь", days: 31 },
    { label: "Январь 2027", days: 31, future: true },
  ];

  var GROUPS = [
    {
      title: "Крупные проекты",
      rows: [
        {
          id: "fund",
          label: "Фундамент Академии",
          hint: "Портал, БЗ, тесты лояльности и бонусов",
          start: "2026-08-01",
          end: "2026-08-31",
          status: "done",
        },
        {
          id: "retail",
          label: "Академия для ритейла",
          hint: "Блок 1: главная, структура, семь блоков жизни",
          start: "2026-09-01",
          end: "2026-09-27",
          status: "done",
        },
        {
          id: "spk",
          label: "Тест СПК",
          hint: "Банк, две волны, явка 100%",
          start: "2026-09-07",
          end: "2026-10-04",
          status: "done",
          deps: ["fund"],
          milestone: "2026-10-04",
        },
        {
          id: "stm",
          label: "СТМ · обучение сети",
          hint: "MIKA, TORRA, INALL. Пилот до 18.10, затем пауза",
          start: "2026-09-21",
          end: "2026-10-18",
          status: "now",
          deps: ["retail"],
        },
        {
          id: "stm-go",
          label: "СТМ · запуск по сети",
          hint: "После паузы 19–23.10. Запуск до 31.10",
          start: "2026-10-26",
          end: "2026-10-31",
          status: "next",
          deps: ["stm"],
          milestone: "2026-10-31",
        },
        {
          id: "mentors",
          label: "Наставники сети · тест и список",
          hint: "Тестирование кандидатов. Черновик именного списка. Пауза 19–23.10",
          start: "2026-10-05",
          end: "2026-10-18",
          status: "now",
        },
        {
          id: "mentors-list",
          label: "Наставники сети · список закрыт",
          hint: "Именной список. Дальше проверяют тесты и помогают писать инструкции",
          start: "2026-10-26",
          end: "2026-10-31",
          status: "next",
          deps: ["mentors"],
          milestone: "2026-10-31",
        },
        {
          id: "rc",
          label: "РЦ и кладовщики магазинов",
          hint: "11 встреч с РЦ, 22 удалённых теста. Проверяют наставники сети",
          start: "2026-11-02",
          end: "2026-11-27",
          status: "next",
          deps: ["stm-go", "mentors-list"],
        },
        {
          id: "kassa",
          label: "Касса и продажи",
          hint: "Выезд 5–6.11, книга кассы с наставниками сети, тест кассиров",
          start: "2026-11-05",
          end: "2026-11-29",
          status: "next",
          deps: ["stm-go", "mentors-list"],
        },
        {
          id: "ipr",
          label: "Планы развития",
          hint: "ИПР и испытательный, шаблон на роли",
          start: "2026-11-09",
          end: "2026-11-29",
          status: "next",
        },
        {
          id: "voice",
          label: "Отзывы и пульс",
          hint: "Мониторинг «Михалыч», пилот пульса до 6.12",
          start: "2026-11-02",
          end: "2026-12-06",
          status: "next",
        },
        {
          id: "dosdacha",
          label: "Досдача ноября",
          hint: "РЦ, удалённые тесты, касса. До паузы 7–13.12",
          start: "2026-11-30",
          end: "2026-12-06",
          status: "next",
          deps: ["rc", "kassa"],
        },
        {
          id: "leaders",
          label: "Онбординг руководителей",
          hint: "Неделя 14–18.12, после паузы 7–13.12",
          start: "2026-12-14",
          end: "2026-12-18",
          status: "next",
        },
        {
          id: "spk-dev",
          label: "Тест СПК · разработка на январь",
          hint: "Две недели: банк, порог, инструкция. Сдают уже в январе 2027",
          start: "2026-12-14",
          end: "2026-12-25",
          status: "next",
          deps: ["spk"],
        },
        {
          id: "close",
          label: "Закрытие года",
          hint: "Тесты сети, досдача, аттестация. Контур 2027",
          start: "2026-12-21",
          end: "2026-12-30",
          status: "next",
          deps: ["rc", "kassa", "leaders"],
          milestone: "2026-12-30",
        },
        {
          id: "spk-jan",
          label: "Тест СПК · январь 2027",
          hint: "Будущее карты. Каждые 3 месяца. Следующий заход после января — апрель 2027",
          start: "2027-01-11",
          end: "2027-01-31",
          status: "future",
          deps: ["spk-dev"],
          milestone: "2027-01-11",
        },
      ],
    },
  ];

  var MILESTONES = [
    { date: "2026-09-07", label: "Старт СПК" },
    { date: "2026-10-04", label: "СПК закрыт" },
    { date: "2026-10-31", label: "СТМ и наставники" },
    { date: "2026-11-06", label: "Выезд · касса" },
    { date: "2026-11-30", label: "Ноябрь" },
    { date: "2026-12-14", label: "Онбординг рук." },
    { date: "2026-12-30", label: "Финиш карты 30.12" },
    { date: "2027-01-11", label: "СПК · январь 2027" },
  ];

  var FUTURE = { start: "2027-01-01", end: "2027-01-31", label: "Будущее карты" };

  var PAUSES = [
    { start: "2026-10-19", end: "2026-10-23", label: "Пауза 19–23.10" },
    { start: "2026-12-07", end: "2026-12-13", label: "Пауза 7–13.12" },
  ];

  function parseDate(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function offset(d) {
    return Math.round((parseDate(d) - START) / 86400000);
  }

  function pctLeft(start) {
    return (offset(start) / TOTAL) * 100;
  }

  function pctWidth(start, end) {
    return ((offset(end) - offset(start) + 1) / TOTAL) * 100;
  }

  function pctDay(dateStr) {
    return (offset(dateStr) / TOTAL) * 100;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function rowById(id) {
    for (var g = 0; g < GROUPS.length; g++) {
      for (var r = 0; r < GROUPS[g].rows.length; r++) {
        if (GROUPS[g].rows[r].id === id) return GROUPS[g].rows[r];
      }
    }
    return null;
  }

  function depLabel(ids) {
    if (!ids || !ids.length) return "";
    return ids
      .map(function (id) {
        var row = rowById(id);
        return row ? row.label.split("·")[0].trim() : id;
      })
      .join(", ");
  }

  function fmtRange(start, end) {
    var a = start.slice(8) + "." + start.slice(5, 7);
    var b = end.slice(8) + "." + end.slice(5, 7);
    if (start.slice(0, 4) !== "2026" || end.slice(0, 4) !== "2026") {
      return a + "." + start.slice(2, 4) + " — " + b + "." + end.slice(2, 4);
    }
    return a + " — " + b;
  }

  function render() {
    var root = document.getElementById("gantt-root");
    if (!root) return;

    var html = '<div class="gantt-shell">';
    html += '<div class="gantt-head">';
    html += '<div class="gantt-col-label"><span>Проекты</span></div>';
    html += '<div class="gantt-col-time">';
    html += '<div class="gantt-months">';
    MONTHS.forEach(function (m) {
      html +=
        '<div class="gantt-month' +
        (m.future ? " gantt-month-future" : "") +
        '" style="flex:' +
        m.days +
        ' 0 0"><span>' +
        esc(m.label) +
        "</span></div>";
    });
    html += "</div>";
    html += '<div class="gantt-mile-line">';
    PAUSES.forEach(function (p) {
      html +=
        '<div class="gantt-pause-band" style="left:' +
        pctLeft(p.start) +
        "%;width:" +
        pctWidth(p.start, p.end) +
        '%" title="' +
        esc(p.label) +
        ': встреч и задач нет"></div>';
    });
    html +=
      '<div class="gantt-future-band" style="left:' +
      pctLeft(FUTURE.start) +
      "%;width:" +
      pctWidth(FUTURE.start, FUTURE.end) +
      '%" title="' +
      esc(FUTURE.label) +
      '"></div>';
    MILESTONES.forEach(function (m) {
      html +=
        '<div class="gantt-mile" style="left:' +
        pctDay(m.date) +
        '%" title="' +
        esc(m.label) +
        '"><i></i><b>' +
        esc(m.label) +
        "</b></div>";
    });
    html += "</div></div></div>";

    html += '<div class="gantt-body" id="gantt-body">';

    GROUPS.forEach(function (group) {
      html += '<div class="gantt-group">';

      group.rows.forEach(function (row) {
        var left = pctLeft(row.start);
        var width = pctWidth(row.start, row.end);
        var dep = row.deps && row.deps.length ? depLabel(row.deps) : "";
        html += '<div class="gantt-row" data-id="' + esc(row.id) + '">';
        html += '<div class="gantt-col-label">';
        html += '<p class="gantt-task">' + esc(row.label) + "</p>";
        html += '<p class="gantt-hint">' + esc(fmtRange(row.start, row.end));
        if (row.hint) html += " · " + esc(row.hint);
        html += "</p>";
        if (dep) {
          html += '<p class="gantt-dep">После: ' + esc(dep) + "</p>";
        }
        html += "</div>";
        html += '<div class="gantt-col-time"><div class="gantt-track" data-track="' + esc(row.id) + '">';
        PAUSES.forEach(function (p) {
          html +=
            '<div class="gantt-pause-band" style="left:' +
            pctLeft(p.start) +
            "%;width:" +
            pctWidth(p.start, p.end) +
            '%" title="' +
            esc(p.label) +
            '"></div>';
        });
        html +=
          '<div class="gantt-future-band" style="left:' +
          pctLeft(FUTURE.start) +
          "%;width:" +
          pctWidth(FUTURE.start, FUTURE.end) +
          '%" title="' +
          esc(FUTURE.label) +
          '"></div>';
        html +=
          '<div class="gantt-bar gantt-' +
          row.status +
          '" style="left:' +
          left +
          "%;width:" +
          width +
          '%" title="' +
          esc(row.label) +
          ": " +
          fmtRange(row.start, row.end) +
          '">';
        if (row.milestone) {
          html += '<span class="gantt-flag" aria-hidden="true"></span>';
        }
        html += "</div></div></div></div>";
      });

      html += "</div>";
    });

    html += "</div>";
    html += '<svg class="gantt-deps" id="gantt-deps" aria-hidden="true"></svg>';
    html += "</div>";

    root.innerHTML = html;
    drawDeps();
    window.addEventListener("resize", debounce(drawDeps, 120));
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  function drawDeps() {
    var svg = document.getElementById("gantt-deps");
    var body = document.getElementById("gantt-body");
    var shell = document.querySelector(".gantt-shell");
    if (!svg || !body || !shell) return;

    var shellRect = shell.getBoundingClientRect();
    var labelCol = shell.querySelector(".gantt-col-label");
    if (!labelCol) return;

    svg.setAttribute("width", shellRect.width);
    svg.setAttribute("height", body.scrollHeight + 8);
    svg.innerHTML = "";

    GROUPS.forEach(function (group) {
      group.rows.forEach(function (row) {
        if (!row.deps || !row.deps.length) return;
        row.deps.forEach(function (depId) {
          var fromTrack = shell.querySelector('[data-track="' + depId + '"] .gantt-bar');
          var toTrack = shell.querySelector('[data-track="' + row.id + '"] .gantt-bar');
          if (!fromTrack || !toTrack) return;

          var fr = fromTrack.getBoundingClientRect();
          var tr = toTrack.getBoundingClientRect();
          var br = body.getBoundingClientRect();

          var x1 = fr.right - shellRect.left;
          var y1 = fr.top + fr.height / 2 - br.top + body.offsetTop;
          var x2 = tr.left - shellRect.left;
          var y2 = tr.top + tr.height / 2 - br.top + body.offsetTop;

          if (x2 <= x1 + 4) return;

          var mid = x1 + (x2 - x1) * 0.45;
          var path =
            "M" +
            x1 +
            " " +
            y1 +
            " C" +
            mid +
            " " +
            y1 +
            ", " +
            mid +
            " " +
            y2 +
            ", " +
            x2 +
            " " +
            y2;

          var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
          p.setAttribute("d", path);
          p.setAttribute("class", "gantt-dep-line");
          svg.appendChild(p);
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
