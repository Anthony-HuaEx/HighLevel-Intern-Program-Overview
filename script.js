(function () {
  "use strict";

  var PHASES = [
    "Pre-Hire Engagement",
    "Onboarding",
    "Active Programming",
    "Wrap-Up & Conversion"
  ];

  var PILLARS = [
    "Professional Development",
    "Engagement & Community",
    "Structural Support"
  ];

  var PILLAR_COLOR = {
    "Professional Development": "#6ea8fe",
    "Engagement & Community": "#f0a050",
    "Structural Support": "#b070e0"
  };

  var CONNECTION_TYPE_COLOR = {
    prerequisite: "#8fb8ff",
    supports: "#4fe0b4",
    parallel: "#5ec4f0",
    feedsInto: "#f0a050",
    coordinated: "#b070e0"
  };

  var CONNECTION_TYPE_LABEL = {
    prerequisite: "prereq",
    supports: "supports",
    parallel: "parallel",
    feedsInto: "feeds",
    coordinated: "coord"
  };

  var INITIATIVES = [
    {
      id: "ama-sessions",
      name: "AMA Sessions",
      phase: "Pre-Hire Engagement",
      pillar: "Engagement & Community",
      category: "Q&A",
      timing: "April",
      required: "optional",
      format: "Virtual",
      stakeholders: ["UR Team", "Incoming Interns", "Peer Leads"],
      budget: "UR Team planning resources",
      description: "Pre-hire Ask Us Anything sessions that set expectations and collect intern questions before start date.",
      connections: [
        { target: "newsletters", type: "prerequisite" },
        { target: "intern-peer-lead-program", type: "feedsInto" },
        { target: "day-1-orientation", type: "supports" }
      ],
      tags: ["pre-hire", "engagement", "expectations"]
    },
    {
      id: "background-checks",
      name: "Background Checks",
      phase: "Pre-Hire Engagement",
      pillar: "Structural Support",
      category: "Compliance",
      timing: "March-April",
      required: "required",
      format: "Online",
      stakeholders: ["HR Ops", "UR Team", "Interns"],
      budget: "Standard HR operations",
      description: "Pre-arrival compliance workflow to clear interns for onboarding and site access.",
      connections: [
        { target: "day-1-orientation", type: "prerequisite" },
        { target: "swag-distribution", type: "coordinated" }
      ],
      tags: ["pre-hire", "operations", "risk-control"]
    },
    {
      id: "book-club",
      name: "Book Club",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Community",
      timing: "June-August",
      required: "optional",
      format: "Hybrid",
      stakeholders: ["Peer Leads", "Interns"],
      budget: "$15-$20 per book",
      description: "Optional peer-led book club for cross-team discussion and informal learning.",
      connections: [
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "socials-offsites", type: "parallel" }
      ],
      tags: ["peer-led", "community", "optional"]
    },
    {
      id: "day-1-orientation",
      name: "Day 1 Orientation",
      phase: "Onboarding",
      pillar: "Structural Support",
      category: "Onboarding",
      timing: "Cohort start date",
      required: "required",
      format: "In-Person",
      stakeholders: ["HR", "UR Team", "Managers", "Interns"],
      budget: "Onboarding logistics",
      description: "Marvell-wide orientation that initiates intern setup, identity access, and first manager handoff.",
      connections: [
        { target: "day-2-ur-orientation", type: "feedsInto" },
        { target: "swag-distribution", type: "coordinated" },
        { target: "manager-mentor-training", type: "prerequisite" }
      ],
      tags: ["onboarding", "mandatory", "integration"]
    },
    {
      id: "day-2-ur-orientation",
      name: "Day 2 UR Orientation",
      phase: "Onboarding",
      pillar: "Structural Support",
      category: "Onboarding",
      timing: "Day 2",
      required: "required",
      format: "Virtual",
      stakeholders: ["UR Team", "Interns"],
      budget: "UR facilitation",
      description: "UR-specific orientation introducing the summer calendar, expectations, and support channels.",
      connections: [
        { target: "onboarding-modules", type: "feedsInto" },
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "office-hours", type: "supports" }
      ],
      tags: ["onboarding", "calendar", "programming"]
    },
    {
      id: "financial-education-week",
      name: "Financial Education Week",
      phase: "Active Programming",
      pillar: "Professional Development",
      category: "Development",
      timing: "Late July-Early August",
      required: "optional",
      format: "Virtual",
      stakeholders: ["Benefits Team", "Finance Speakers", "Interns"],
      budget: "UR educational programming",
      description: "Optional sequence of benefits, 401k, ESPP/RSU, and planning sessions supporting career readiness.",
      connections: [
        { target: "performance-evaluations", type: "supports" },
        { target: "project-presentations", type: "parallel" },
        { target: "speaker-series", type: "coordinated" }
      ],
      tags: ["career-readiness", "benefits", "optional"]
    },
    {
      id: "global-intern-event",
      name: "Global Intern Event",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Signature Event",
      timing: "July 22",
      required: "required",
      format: "Virtual",
      stakeholders: ["UR Team", "Global Intern Cohorts"],
      budget: "UR Team budget + swag logistics",
      description: "Global virtual team challenge designed for cross-region connection and brand experience.",
      connections: [
        { target: "swag-distribution", type: "prerequisite" },
        { target: "national-intern-day", type: "supports" },
        { target: "speaker-series", type: "parallel" }
      ],
      tags: ["global", "mandatory", "team-building"]
    },
    {
      id: "intern-experience-survey",
      name: "Intern Experience Survey",
      phase: "Wrap-Up & Conversion",
      pillar: "Structural Support",
      category: "Feedback",
      timing: "Late July-Early August",
      required: "required",
      format: "Online",
      stakeholders: ["UR Team", "Interns", "Program Managers"],
      budget: "Survey tooling",
      description: "Formal feedback collection point used to improve current and future cohorts.",
      connections: [
        { target: "performance-evaluations", type: "supports" },
        { target: "project-presentations", type: "parallel" },
        { target: "newsletters", type: "feedsInto" }
      ],
      tags: ["feedback", "quality-loop", "continuous-improvement"]
    },
    {
      id: "intern-peer-lead-program",
      name: "Intern Peer Lead Program",
      phase: "Onboarding",
      pillar: "Engagement & Community",
      category: "Community",
      timing: "May-August",
      required: "required",
      format: "Hybrid",
      stakeholders: ["Peer Leads", "Site Leads", "UR Team"],
      budget: "$35-$40 per intern",
      description: "Peer-led social and belonging framework coordinating weekly and monthly local touchpoints.",
      connections: [
        { target: "socials-offsites", type: "feedsInto" },
        { target: "volunteer-events", type: "feedsInto" },
        { target: "book-club", type: "supports" },
        { target: "site-lead-kick-off", type: "supports" }
      ],
      tags: ["community", "belonging", "site-activation"]
    },
    {
      id: "lab-tours",
      name: "Lab Tours",
      phase: "Onboarding",
      pillar: "Professional Development",
      category: "Technical Exposure",
      timing: "May-June",
      required: "varies",
      format: "In-Person",
      stakeholders: ["Site Leads", "Engineering Teams", "Interns"],
      budget: "Site-hosted logistics",
      description: "Site-level technical immersion tours that contextualize project work and product environment.",
      connections: [
        { target: "day-1-orientation", type: "supports" },
      ],
      tags: ["technical", "site-specific", "onboarding"]
    },
    {
      id: "linkedin-group",
      name: "LinkedIn Group",
      phase: "Pre-Hire Engagement",
      pillar: "Engagement & Community",
      category: "Communications",
      timing: "January onward",
      required: "optional",
      format: "Online",
      stakeholders: ["UR Team", "Incoming Interns"],
      budget: "No direct budget",
      description: "Community hub for pre-arrival networking and early belonging before day-one onboarding.",
      connections: [
        { target: "newsletters", type: "supports" },
        { target: "ama-sessions", type: "supports" },
        { target: "intern-peer-lead-program", type: "supports" }
      ],
      tags: ["pre-hire", "networking", "community-hub"]
    },
    {
      id: "manager-mentor-training",
      name: "Manager/Mentor Training",
      phase: "Pre-Hire Engagement",
      pillar: "Structural Support",
      category: "Training",
      timing: "April",
      required: "required",
      format: "Virtual",
      stakeholders: ["Managers", "Mentors", "UR Team"],
      budget: "UR training program",
      description: "Pre-onboarding manager and mentor readiness sessions for project plans and support expectations.",
      connections: [
        { target: "day-1-orientation", type: "prerequisite" },
        { target: "performance-evaluations", type: "supports" },
        { target: "project-presentations", type: "supports" }
      ],
      tags: ["manager-readiness", "conversion", "training"]
    },
    {
      id: "marvell-5k",
      name: "Marvell 5k",
      phase: "Onboarding",
      pillar: "Engagement & Community",
      category: "Signature Event",
      timing: "May 28",
      required: "optional",
      format: "In-Person",
      stakeholders: ["Company Events Team", "UR Team", "Interns"],
      budget: "Company event budget",
      description: "Early-program community event creating initial social bonding across sites and teams.",
      connections: [
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "national-intern-day", type: "parallel" }
      ],
      tags: ["wellness", "community", "early-touchpoint"]
    },
    {
      id: "national-intern-day",
      name: "National Intern Day",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Recognition",
      timing: "July 30",
      required: "varies",
      format: "In-Person",
      stakeholders: ["Managers", "Site Leads", "Interns"],
      budget: "Manager + site budgets",
      description: "Recognition day coordinated with speaker programming and local appreciation activities.",
      connections: [
        { target: "speaker-series", type: "coordinated" },
        { target: "global-intern-event", type: "supports" },
        { target: "socials-offsites", type: "parallel" }
      ],
      tags: ["recognition", "engagement", "site-events"]
    },
    {
      id: "newsletters",
      name: "Newsletters",
      phase: "Pre-Hire Engagement",
      pillar: "Structural Support",
      category: "Communications",
      timing: "January-May + in-program updates",
      required: "required",
      format: "Email",
      stakeholders: ["UR Team", "Incoming Interns", "Managers"],
      budget: "UR communications resources",
      description: "Communication backbone carrying key dates, announcements, and conversion pipeline updates.",
      connections: [
        { target: "linkedin-group", type: "feedsInto" },
        { target: "ama-sessions", type: "feedsInto" },
        { target: "day-1-orientation", type: "supports" },
        { target: "speaker-series", type: "supports" }
      ],
      tags: ["communications-hub", "required", "calendar-alignment"]
    },
    {
      id: "office-hours",
      name: "Office Hours",
      phase: "Active Programming",
      pillar: "Structural Support",
      category: "Support",
      timing: "Bi-weekly",
      required: "optional",
      format: "Virtual",
      stakeholders: ["UR Team", "Managers", "Interns"],
      budget: "No incremental budget",
      description: "Recurring open support sessions resolving blockers and clarifying programming expectations.",
      connections: [
        { target: "onboarding-modules", type: "supports" },
        { target: "performance-evaluations", type: "supports" },
        { target: "r-factor-workshop", type: "parallel" }
      ],
      tags: ["support", "bi-weekly", "operations"]
    },
    {
      id: "onboarding-modules",
      name: "Onboarding Modules",
      phase: "Onboarding",
      pillar: "Professional Development",
      category: "Training",
      timing: "Week 1",
      required: "required",
      format: "Self-Guided",
      stakeholders: ["L&D", "UR Team", "Interns"],
      budget: "L&D platform cost",
      description: "Self-guided learning modules covering policy, AI tools, and internship foundations.",
      connections: [
        { target: "office-hours", type: "supports" },
        { target: "r-factor-workshop", type: "supports" },
        { target: "performance-evaluations", type: "supports" }
      ],
      tags: ["foundations", "compliance", "learning"]
    },
    {
      id: "performance-evaluations",
      name: "Performance Evaluations",
      phase: "Wrap-Up & Conversion",
      pillar: "Professional Development",
      category: "Evaluation",
      timing: "Midpoint + final 2 weeks",
      required: "required",
      format: "Workday",
      stakeholders: ["Managers", "Interns", "HR"],
      budget: "Workday process cost",
      description: "Mid and final performance checkpoints driving conversion and extension decisions.",
      connections: [
        { target: "project-presentations", type: "coordinated" },
        { target: "intern-experience-survey", type: "parallel" },
        { target: "newsletters", type: "feedsInto" }
      ],
      tags: ["conversion", "required", "decision-gate"]
    },
    {
      id: "project-presentations",
      name: "Project Presentations",
      phase: "Wrap-Up & Conversion",
      pillar: "Professional Development",
      category: "Milestone",
      timing: "Last 2-3 weeks",
      required: "required",
      format: "In-Person",
      stakeholders: ["Interns", "Managers", "Org Leaders"],
      budget: "Team-level presentation logistics",
      description: "Capstone showcase of intern impact and technical outcomes for organization stakeholders.",
      connections: [
        { target: "performance-evaluations", type: "supports" },
        { target: "national-intern-day", type: "parallel" },
        { target: "newsletters", type: "feedsInto" }
      ],
      tags: ["capstone", "visibility", "impact"]
    },
    {
      id: "site-lead-kick-off",
      name: "Site Lead Kick-off",
      phase: "Pre-Hire Engagement",
      pillar: "Structural Support",
      category: "Operations",
      timing: "March",
      required: "required",
      format: "Virtual",
      stakeholders: ["Site Leads", "UR Team"],
      budget: "Site planning resources",
      description: "Logistics alignment kickoff for local events, facilities support, and summer execution readiness.",
      connections: [
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "speaker-series", type: "supports" },
        { target: "socials-offsites", type: "supports" }
      ],
      tags: ["operations", "local-coordination", "prerequisite"]
    },
    {
      id: "socials-offsites",
      name: "Socials/Offsites",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Community",
      timing: "Monthly",
      required: "varies",
      format: "In-Person",
      stakeholders: ["Peer Leads", "Site Leads", "Interns"],
      budget: "Peer + site budgets",
      description: "Recurring local social programming including coffee chats, lunches, and offsite outings.",
      connections: [
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "volunteer-events", type: "parallel" },
        { target: "book-club", type: "parallel" }
      ],
      tags: ["local-events", "belonging", "engagement"]
    },
    {
      id: "speaker-series",
      name: "Speaker Series",
      phase: "Active Programming",
      pillar: "Professional Development",
      category: "Leadership",
      timing: "Wednesdays, July-August",
      required: "required",
      format: "In-Person",
      stakeholders: ["Executives", "Site Leads", "UR Team", "Interns"],
      budget: "UR Team budget",
      description: "Four mandatory leadership sessions (AI panel, Women@Marvell, CEO, COO) with strong executive visibility.",
      connections: [
        { target: "site-lead-kick-off", type: "prerequisite" },
        { target: "national-intern-day", type: "coordinated" },
        { target: "project-presentations", type: "supports" }
      ],
      tags: ["executive-access", "mandatory", "leadership"]
    },
    {
      id: "swag-distribution",
      name: "Swag Distribution",
      phase: "Onboarding",
      pillar: "Structural Support",
      category: "Logistics",
      timing: "April-June",
      required: "required",
      format: "Hybrid",
      stakeholders: ["UR Team", "Site Leads", "Interns"],
      budget: "~$100k total swag",
      description: "Physical welcome + event merchandise distribution coordinated by cohort and event calendar.",
      connections: [
        { target: "day-1-orientation", type: "coordinated" },
        { target: "global-intern-event", type: "supports" },
        { target: "marvell-5k", type: "supports" }
      ],
      tags: ["logistics", "brand-experience", "required"]
    },
    {
      id: "volunteer-events",
      name: "Volunteer Events",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Community",
      timing: "Once per summer",
      required: "optional",
      format: "In-Person",
      stakeholders: ["Peer Leads", "Interns", "Site Leads"],
      budget: "Paid VTO + peer budget support",
      description: "Purpose-driven community activity organized by peer leaders to reinforce social impact.",
      connections: [
        { target: "intern-peer-lead-program", type: "supports" },
        { target: "socials-offsites", type: "coordinated" },
        { target: "intern-experience-survey", type: "feedsInto" }
      ],
      tags: ["philanthropy", "peer-led", "culture"]
    },
    {
      id: "yoga-with-scott-moore",
      name: "Yoga with Scott Moore",
      phase: "Active Programming",
      pillar: "Engagement & Community",
      category: "Community",
      timing: "July",
      required: "optional",
      format: "Hybrid",
      stakeholders: ["Scott Moore", "Interns", "UR Team"],
      budget: "Wellness event support",
      description: "Wellness session focused on intern connection, engagement, and community-building across teams.",
      connections: [
        { target: "r-factor-workshop", type: "parallel" },
        { target: "office-hours", type: "parallel" },
        { target: "socials-offsites", type: "coordinated" }
      ],
      tags: ["wellness", "balance", "optional"]
    }
  ];

  // ── Derived data ──

  var initiatives = INITIATIVES.map(function (item, index) {
    var phaseOrder = PHASES.indexOf(item.phase);
    return {
      id: item.id,
      name: item.name,
      phase: item.phase,
      pillar: item.pillar,
      category: item.category,
      timing: item.timing,
      required: item.required,
      format: item.format,
      stakeholders: item.stakeholders.slice(),
      budget: item.budget,
      description: item.description,
      connections: item.connections.slice(),
      tags: item.tags.slice(),
      phaseOrder: phaseOrder === -1 ? 99 : phaseOrder,
      order: index
    };
  });

  var byId = {};
  initiatives.forEach(function (initiative) {
    byId[initiative.id] = initiative;
  });

  // ── State management ──

  var STORAGE_KEY = "marvell-intern-dashboard-v2";

  var DEFAULT_FILTERS = {
    phase: "all",
    pillar: "all",
    category: "all",
    required: "all",
    format: "all",
    connection: "all"
  };

  var DEFAULT_STATE = {
    search: "",
    filters: DEFAULT_FILTERS,
    spotlightIds: [],
    expanded: {}
  };

  var transientState = { hoverId: null };
  var appState = loadState();

  // ── DOM references ──

  var refs = {
    resultsCount: document.getElementById("results-count"),
    spotlightMeta: document.getElementById("spotlight-meta"),
    searchInput: document.getElementById("search-input"),
    phaseFilter: document.getElementById("phase-filter"),
    pillarFilter: document.getElementById("pillar-filter"),
    categoryFilter: document.getElementById("category-filter"),
    requiredFilter: document.getElementById("required-filter"),
    formatFilter: document.getElementById("format-filter"),
    connectionFilter: document.getElementById("connection-filter"),
    clearFilters: document.getElementById("clear-filters"),
    clearSpotlight: document.getElementById("clear-spotlight"),
    timelineGrid: document.getElementById("timeline-grid"),
    timelineCanvas: document.getElementById("timeline-canvas"),
    timelineSvgBase: document.getElementById("timeline-svg-base"),
    timelineSvgFocus: document.getElementById("timeline-svg-focus"),
    details: document.getElementById("details-content")
  };

  // ── Init ──

  setupFilterOptions();
  bindControls();
  render();
  window.addEventListener("resize", debounce(function () {
    updateFocusVisualization(getVisibleInitiatives());
  }, 150));

  // ── State persistence ──

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefaultState();
      var parsed = JSON.parse(raw);
      return {
        search: typeof parsed.search === "string" ? parsed.search : "",
        filters: mergeFilters(parsed.filters),
        spotlightIds: normalizeSpotlightIds(parsed),
        expanded: parsed.expanded && typeof parsed.expanded === "object" ? parsed.expanded : {}
      };
    } catch (_) {
      return cloneDefaultState();
    }
  }

  function cloneDefaultState() {
    return {
      search: DEFAULT_STATE.search,
      filters: mergeFilters(DEFAULT_FILTERS),
      spotlightIds: [],
      expanded: {}
    };
  }

  function normalizeSpotlightIds(parsed) {
    if (parsed && Array.isArray(parsed.spotlightIds)) {
      return parsed.spotlightIds.filter(function (id, index, list) {
        return typeof id === "string" && list.indexOf(id) === index;
      });
    }
    if (parsed && typeof parsed.spotlightId === "string") {
      return [parsed.spotlightId];
    }
    return [];
  }

  function mergeFilters(filters) {
    return {
      phase: filters && filters.phase ? filters.phase : "all",
      pillar: filters && filters.pillar ? filters.pillar : "all",
      category: filters && filters.category ? filters.category : "all",
      required: filters && filters.required ? filters.required : "all",
      format: filters && filters.format ? filters.format : "all",
      connection: filters && filters.connection ? filters.connection : "all"
    };
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        search: appState.search,
        filters: appState.filters,
        spotlightIds: appState.spotlightIds,
        expanded: appState.expanded
      }));
    } catch (_) { /* storage may be unavailable */ }
  }

  // ── Filter helpers ──

  function setupFilterOptions() {
    setSelectOptions(refs.phaseFilter, uniqueValues("phase"), "All");
    setSelectOptions(refs.pillarFilter, uniqueValues("pillar"), "All");
    setSelectOptions(refs.categoryFilter, uniqueValues("category"), "All");
    setSelectOptions(refs.formatFilter, uniqueValues("format"), "All");
  }

  function uniqueValues(field) {
    var set = {};
    initiatives.forEach(function (item) { set[item[field]] = true; });
    return Object.keys(set).sort();
  }

  function setSelectOptions(select, values, allLabel) {
    var options = ["<option value=\"all\">" + escapeHtml(allLabel) + "</option>"];
    values.forEach(function (value) {
      options.push("<option value=\"" + escapeHtml(value) + "\">" + escapeHtml(value) + "</option>");
    });
    select.innerHTML = options.join("");
  }

  // ── Event binding ──

  function bindControls() {
    refs.searchInput.value = appState.search;
    refs.phaseFilter.value = appState.filters.phase;
    refs.pillarFilter.value = appState.filters.pillar;
    refs.categoryFilter.value = appState.filters.category;
    refs.requiredFilter.value = appState.filters.required;
    refs.formatFilter.value = appState.filters.format;
    refs.connectionFilter.value = appState.filters.connection;

    var applySearch = debounce(function (value) {
      setState({ search: value.trim() });
    }, 300);
    refs.searchInput.addEventListener("input", function (event) {
      applySearch(event.target.value);
    });

    var filterSelects = [refs.phaseFilter, refs.pillarFilter, refs.categoryFilter,
                         refs.requiredFilter, refs.formatFilter, refs.connectionFilter];
    filterSelects.forEach(function (select) {
      select.addEventListener("change", function () {
        var nextFilters = mergeFilters(appState.filters);
        nextFilters.phase = refs.phaseFilter.value;
        nextFilters.pillar = refs.pillarFilter.value;
        nextFilters.category = refs.categoryFilter.value;
        nextFilters.required = refs.requiredFilter.value;
        nextFilters.format = refs.formatFilter.value;
        nextFilters.connection = refs.connectionFilter.value;
        setState({ filters: nextFilters });
      });
    });

    refs.clearFilters.addEventListener("click", function () {
      refs.searchInput.value = "";
      refs.phaseFilter.value = "all";
      refs.pillarFilter.value = "all";
      refs.categoryFilter.value = "all";
      refs.requiredFilter.value = "all";
      refs.formatFilter.value = "all";
      refs.connectionFilter.value = "all";
      setState({ search: "", filters: mergeFilters(DEFAULT_FILTERS) });
    });

    refs.clearSpotlight.addEventListener("click", function () {
      transientState.hoverId = null;
      setState({ spotlightIds: [] });
    });

    refs.timelineGrid.addEventListener("click", onCardInteraction);
    refs.timelineGrid.addEventListener("keydown", onCardKeyboard);
    refs.timelineGrid.addEventListener("mouseover", onHoverCard);
    refs.timelineGrid.addEventListener("mouseout", onLeaveCard);
  }

  function onCardInteraction(event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;
    var action = button.getAttribute("data-action");
    var id = button.getAttribute("data-id");
    if (!id) return;
    if (action === "spotlight") {
      var nextSpotlightIds = appState.spotlightIds.slice();
      var idx = nextSpotlightIds.indexOf(id);
      if (idx === -1) {
        nextSpotlightIds.push(id);
      } else {
        nextSpotlightIds.splice(idx, 1);
      }
      setState({ spotlightIds: nextSpotlightIds });
    } else if (action === "expand") {
      var expanded = Object.assign({}, appState.expanded);
      expanded[id] = !expanded[id];
      setState({ expanded: expanded });
    }
  }

  function onCardKeyboard(event) {
    var target = event.target.closest("button[data-action='spotlight']");
    if (!target) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      target.click();
    }
  }

  function onHoverCard(event) {
    var button = event.target.closest("button[data-action='spotlight']");
    if (!button) return;
    var id = button.getAttribute("data-id");
    if (id) {
      transientState.hoverId = id;
      updateFocusVisualization(getVisibleInitiatives());
    }
  }

  function onLeaveCard(event) {
    var related = event.relatedTarget;
    if (related && related.closest && related.closest(".initiative-card")) return;
    transientState.hoverId = null;
    updateFocusVisualization(getVisibleInitiatives());
  }

  // ── State transitions ──

  function setState(partial) {
    appState = Object.assign({}, appState, partial);
    var visible = getVisibleInitiatives();
    appState.spotlightIds = normalizeSpotlightIds({ spotlightIds: appState.spotlightIds })
      .filter(function (id) { return !!byId[id]; });
    var visibleSet = {};
    visible.forEach(function (item) { visibleSet[item.id] = true; });
    appState.spotlightIds = appState.spotlightIds.filter(function (id) { return visibleSet[id]; });
    persistState();
    render();
  }

  // ── Filtering ──

  function getVisibleInitiatives() {
    var query = appState.search.toLowerCase();
    return initiatives
      .filter(function (item) { return filterByFacet(item, appState.filters); })
      .filter(function (item) { return filterBySearch(item, query); })
      .sort(function (a, b) {
        if (a.phaseOrder !== b.phaseOrder) return a.phaseOrder - b.phaseOrder;
        return a.order - b.order;
      });
  }

  function filterByFacet(item, filters) {
    if (filters.phase !== "all" && item.phase !== filters.phase) return false;
    if (filters.pillar !== "all" && item.pillar !== filters.pillar) return false;
    if (filters.category !== "all" && item.category !== filters.category) return false;
    if (filters.required !== "all" && item.required !== filters.required) return false;
    if (filters.format !== "all" && item.format !== filters.format) return false;
    if (filters.connection !== "all") {
      return item.connections.some(function (conn) { return conn.type === filters.connection; });
    }
    return true;
  }

  function filterBySearch(item, query) {
    if (!query) return true;
    var blob = [
      item.name, item.phase, item.pillar, item.category,
      item.timing, item.required, item.format, item.budget,
      item.description, item.tags.join(" "), item.stakeholders.join(" ")
    ].join(" ").toLowerCase();
    return blob.indexOf(query) !== -1;
  }

  // ── Render pipeline ──

  function render() {
    var visible = getVisibleInitiatives();
    renderSummary(visible);
    renderDetailsPanel(visible);
    renderTimeline(visible);
  }

  function renderSummary(visible) {
    refs.resultsCount.textContent = String(visible.length);
    var spotlightItems = getVisibleSpotlights(visible);
    if (spotlightItems.length === 1) {
      refs.spotlightMeta.textContent = " | Spotlight: " + spotlightItems[0].name;
    } else if (spotlightItems.length > 1) {
      refs.spotlightMeta.textContent = " | Spotlights (" + spotlightItems.length + "): " +
        spotlightItems.map(function (item) { return item.name; }).join(", ");
    } else {
      refs.spotlightMeta.textContent = "";
    }
  }

  function renderDetailsPanel(visible) {
    var spotlightItems = getVisibleSpotlights(visible);
    if (!spotlightItems.length) {
      refs.details.innerHTML = "<div class=\"details-empty\">Select an initiative to inspect timeline context, dependencies, and ownership.</div>";
      return;
    }
    if (spotlightItems.length === 1) {
      refs.details.innerHTML = renderSingleSpotlightDetails(visible, spotlightItems[0]);
      return;
    }
    refs.details.innerHTML = renderMultiSpotlightDetails(visible, spotlightItems);
  }

  function renderSingleSpotlightDetails(visible, item) {
    if (!item || !visible.some(function (c) { return c.id === item.id; })) {
      return "<div class=\"details-empty\">Current spotlight is filtered out. Clear filters or choose another initiative.</div>";
    }
    var visibleSet = {};
    visible.forEach(function (node) { visibleSet[node.id] = true; });
    var incoming = visible.filter(function (c) {
      return c.connections.some(function (conn) { return conn.target === item.id; });
    });
    var outgoing = item.connections
      .filter(function (conn) { return visibleSet[conn.target]; })
      .map(function (conn) { return byId[conn.target] ? byId[conn.target].name + " (" + conn.type + ")" : null; })
      .filter(Boolean);
    return [
      "<h3>" + escapeHtml(item.name) + "</h3>",
      "<p>" + escapeHtml(item.description) + "</p>",
      "<p><strong>Phase:</strong> " + escapeHtml(item.phase) + "</p>",
      "<p><strong>Pillar:</strong> " + escapeHtml(item.pillar) + "</p>",
      "<p><strong>Timing:</strong> " + escapeHtml(item.timing) + "</p>",
      "<p><strong>Required:</strong> " + escapeHtml(item.required) + "</p>",
      "<p><strong>Format:</strong> " + escapeHtml(item.format) + "</p>",
      "<p><strong>Stakeholders:</strong> " + escapeHtml(item.stakeholders.join(", ")) + "</p>",
      "<p><strong>Budget:</strong> " + escapeHtml(item.budget) + "</p>",
      "<p><strong>Outgoing links:</strong> " + (outgoing.length ? escapeHtml(outgoing.join("; ")) : "None") + "</p>",
      "<p><strong>Incoming links:</strong> " + (incoming.length ? escapeHtml(incoming.map(function (x) { return x.name; }).join(", ")) : "None") + "</p>"
    ].join("");
  }

  function renderMultiSpotlightDetails(visible, spotlightItems) {
    var spotlightIds = spotlightItems.map(function (item) { return item.id; });
    var spotlightSet = {};
    spotlightIds.forEach(function (id) { spotlightSet[id] = true; });
    var visibleSet = {};
    visible.forEach(function (item) { visibleSet[item.id] = true; });

    var outgoingCount = 0;
    var incomingCount = 0;
    var typeCounts = {};
    visible.forEach(function (item) {
      item.connections.forEach(function (conn) {
        if (!visibleSet[conn.target]) return;
        if (spotlightSet[item.id]) {
          outgoingCount += 1;
          typeCounts[conn.type] = (typeCounts[conn.type] || 0) + 1;
        }
        if (spotlightSet[conn.target]) {
          incomingCount += 1;
        }
      });
    });

    var focusContext = buildFocusContext(visible, spotlightIds);
    var relatedNames = Object.keys(focusContext.relatedSet)
      .filter(function (id) { return !spotlightSet[id] && byId[id]; })
      .map(function (id) { return byId[id].name; })
      .sort();
    var typeSummary = Object.keys(typeCounts).sort().map(function (type) {
      return type + " (" + typeCounts[type] + ")";
    });

    return [
      "<h3>Multi-Spotlight (" + String(spotlightItems.length) + ")</h3>",
      "<p><strong>Selected initiatives:</strong> " + escapeHtml(spotlightItems.map(function (item) { return item.name; }).join(", ")) + "</p>",
      "<p><strong>Outgoing links from selected:</strong> " + String(outgoingCount) + "</p>",
      "<p><strong>Incoming links to selected:</strong> " + String(incomingCount) + "</p>",
      "<p><strong>Directly related initiatives in view:</strong> " + (relatedNames.length ? escapeHtml(relatedNames.join(", ")) : "None") + "</p>",
      "<p><strong>Connection types from selected:</strong> " + (typeSummary.length ? escapeHtml(typeSummary.join("; ")) : "None") + "</p>"
    ].join("");
  }

  // ── Timeline rendering ──

  function renderTimeline(visible) {
    var grouped = {};
    PHASES.forEach(function (phase) { grouped[phase] = []; });
    visible.forEach(function (item) {
      if (!grouped[item.phase]) grouped[item.phase] = [];
      grouped[item.phase].push(item);
    });

    var html = PHASES.map(function (phase) {
      var cards = grouped[phase].map(function (item) {
        return renderCard(item);
      }).join("");
      return [
        "<section class=\"timeline-phase\" data-phase=\"" + escapeHtml(phase) + "\">",
        "<h3>" + escapeHtml(phase) + " (" + grouped[phase].length + ")</h3>",
        "<div class=\"card-list\">",
        cards || "<p class=\"result-meta\">No initiatives match this phase.</p>",
        "</div>",
        "</section>"
      ].join("");
    }).join("");

    refs.timelineGrid.innerHTML = html;
    updateFocusVisualization(visible);
  }

  function renderCard(item) {
    var expanded = !!appState.expanded[item.id];
    var isSpotlighted = appState.spotlightIds.indexOf(item.id) !== -1;
    var badges = item.connections.map(function (conn) {
      var color = CONNECTION_TYPE_COLOR[conn.type] || "#888";
      var targetName = byId[conn.target] ? byId[conn.target].name : conn.target;
      var label = CONNECTION_TYPE_LABEL[conn.type] || conn.type;
      return "<span class=\"conn-dot\" style=\"background:" + color + "\" title=\"" +
        escapeHtml(label + " \u2192 " + targetName) + "\"></span>";
    }).join("");
    return [
      "<article class=\"initiative-card\" data-card-id=\"" + escapeHtml(item.id) + "\" style=\"border-left-color:" + PILLAR_COLOR[item.pillar] + "\">",
      "<button class=\"card-select\" data-action=\"spotlight\" data-id=\"" + escapeHtml(item.id) + "\" aria-pressed=\"" + String(isSpotlighted) + "\" aria-label=\"Spotlight " + escapeHtml(item.name) + "\">",
      "<h4>" + escapeHtml(item.name) + "</h4>",
      "<div>" + escapeHtml(item.timing) + "</div>",
      "<div class=\"meta-row\">",
      "<span class=\"chip\">" + escapeHtml(item.required) + "</span>",
      "<span class=\"chip\">" + escapeHtml(item.format) + "</span>",
      "<span class=\"chip\">" + escapeHtml(item.category) + "</span>",
      "</div>",
      badges ? "<div class=\"conn-badges\">" + badges + "</div>" : "",
      "</button>",
      "<div class=\"card-actions\">",
      "<button class=\"card-action\" data-action=\"expand\" data-id=\"" + escapeHtml(item.id) + "\" aria-expanded=\"" + String(expanded) + "\">" + (expanded ? "Hide details" : "Expand details") + "</button>",
      "<button class=\"card-action\" data-action=\"spotlight\" data-id=\"" + escapeHtml(item.id) + "\" aria-pressed=\"" + String(isSpotlighted) + "\">" + (isSpotlighted ? "Unspotlight" : "Spotlight") + "</button>",
      "</div>",
      expanded
        ? "<div class=\"card-details\"><div><strong>Stakeholders:</strong> " + escapeHtml(item.stakeholders.join(", ")) + "</div><div><strong>Budget:</strong> " + escapeHtml(item.budget) + "</div><div><strong>Connections:</strong> " + escapeHtml(item.connections.map(function (conn) { return conn.type + " \u2192 " + (byId[conn.target] ? byId[conn.target].name : conn.target); }).join("; ") || "None") + "</div></div>"
        : "",
      "</article>"
    ].join("");
  }

  // ── SVG connection lines ──

  function updateFocusVisualization(visible) {
    var focusContext = buildFocusContext(visible, getActiveFocusIds());
    applyCardFocusState(focusContext);
    drawTimelineConnections(visible, focusContext);
  }

  function drawTimelineConnections(visible, focusContext) {
    var rect = refs.timelineCanvas.getBoundingClientRect();
    var width = Math.max(refs.timelineGrid.scrollWidth, refs.timelineCanvas.clientWidth);
    var height = Math.max(refs.timelineGrid.scrollHeight, refs.timelineCanvas.clientHeight);
    [refs.timelineSvgBase, refs.timelineSvgFocus].forEach(function (svg) {
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
    });

    refs.timelineSvgBase.innerHTML = "";

    if (!focusContext.hasFocus) {
      refs.timelineSvgFocus.innerHTML = "";
      return;
    }

    var idSet = {};
    visible.forEach(function (item) { idSet[item.id] = true; });

    var defs = "<defs>";
    Object.keys(CONNECTION_TYPE_COLOR).forEach(function (type) {
      var color = CONNECTION_TYPE_COLOR[type];
      defs += "<marker id=\"arrow-" + type + "\" markerWidth=\"8\" markerHeight=\"6\" " +
        "refX=\"7\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">" +
        "<path d=\"M0,0 L8,3 L0,6\" fill=\"" + color + "\" /></marker>";
    });
    defs += "</defs>";

    var edgeParts = [];
    var labelParts = [];
    var edgeIndex = 0;
    var scrollLeft = refs.timelineCanvas.scrollLeft;
    var scrollTop = refs.timelineCanvas.scrollTop;

    visible.forEach(function (item) {
      item.connections.forEach(function (conn) {
        if (!idSet[conn.target]) return;
        if (!focusContext.focusSet[item.id] && !focusContext.focusSet[conn.target]) return;

        var fromEl = refs.timelineGrid.querySelector("[data-card-id=\"" + cssEscape(item.id) + "\"]");
        var toEl = refs.timelineGrid.querySelector("[data-card-id=\"" + cssEscape(conn.target) + "\"]");
        if (!fromEl || !toEl) return;

        var fromRect = fromEl.getBoundingClientRect();
        var toRect = toEl.getBoundingClientRect();

        var fromCX = fromRect.left + fromRect.width / 2;
        var toCX = toRect.left + toRect.width / 2;
        var forward = toCX >= fromCX;

        var x1 = (forward ? fromRect.right : fromRect.left) - rect.left + scrollLeft;
        var x2 = (forward ? toRect.left : toRect.right) - rect.left + scrollLeft;
        var y1 = fromRect.top - rect.top + scrollTop + fromRect.height * 0.5;
        var y2 = toRect.top - rect.top + scrollTop + toRect.height * 0.5;

        var jitter = (edgeIndex % 5 - 2) * 6;
        y1 += jitter;
        y2 += jitter;

        var midX = x1 + (x2 - x1) * 0.5;
        var pathD = "M" + x1 + "," + y1 + " C" + midX + "," + y1 + " " + midX + "," + y2 + " " + x2 + "," + y2;
        var color = CONNECTION_TYPE_COLOR[conn.type] || "#888";

        edgeParts.push(
          "<path class=\"edge-" + conn.type + " edge-active\" d=\"" + pathD +
          "\" marker-end=\"url(#arrow-" + conn.type + ")\" />"
        );

        var labelX = x1 + (x2 - x1) * 0.5;
        var labelY = y1 + (y2 - y1) * 0.5 - 8;
        var label = CONNECTION_TYPE_LABEL[conn.type] || conn.type;
        labelParts.push(
          "<text class=\"edge-label\" x=\"" + labelX + "\" y=\"" + labelY +
          "\" fill=\"" + color + "\">" + escapeHtml(label) + "</text>"
        );

        edgeIndex += 1;
      });
    });

    refs.timelineSvgFocus.innerHTML = defs + edgeParts.join("") + labelParts.join("");
  }

  // ── Connectivity helpers ──

  function getVisibleSpotlights(visible) {
    var visibleSet = {};
    visible.forEach(function (item) { visibleSet[item.id] = true; });
    return appState.spotlightIds
      .filter(function (id) { return visibleSet[id] && byId[id]; })
      .map(function (id) { return byId[id]; });
  }

  function getActiveFocusIds() {
    var ids = normalizeSpotlightIds({ spotlightIds: appState.spotlightIds });
    if (transientState.hoverId && ids.indexOf(transientState.hoverId) === -1) {
      ids.push(transientState.hoverId);
    }
    return ids;
  }

  function buildFocusContext(visible, activeIds) {
    var visibleSet = {};
    visible.forEach(function (item) { visibleSet[item.id] = true; });

    var focusSet = {};
    activeIds.forEach(function (id) {
      if (visibleSet[id]) focusSet[id] = true;
    });
    var hasFocus = Object.keys(focusSet).length > 0;
    var relatedSet = {};
    if (!hasFocus) {
      return { hasFocus: false, focusSet: focusSet, relatedSet: relatedSet };
    }

    Object.keys(focusSet).forEach(function (id) { relatedSet[id] = true; });
    visible.forEach(function (item) {
      if (focusSet[item.id]) {
        item.connections.forEach(function (conn) {
          if (visibleSet[conn.target]) relatedSet[conn.target] = true;
        });
      }
      if (item.connections.some(function (conn) { return focusSet[conn.target]; })) {
        relatedSet[item.id] = true;
      }
    });
    return { hasFocus: true, focusSet: focusSet, relatedSet: relatedSet };
  }

  function applyCardFocusState(focusContext) {
    var cards = refs.timelineGrid.querySelectorAll(".initiative-card");
    cards.forEach(function (card) {
      var id = card.getAttribute("data-card-id");
      var isDim = focusContext.hasFocus && !focusContext.relatedSet[id];
      card.classList.toggle("is-dim", isDim);
    });
  }

  // ── Utilities ──

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
    return String(value).replace(/"/g, "\\\"");
  }

})();
