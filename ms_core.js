/* 2EMME Core: multiproperty data adapter, sidebar and local sync */
(function(){
  const PAGES = [
    ["index.html", "Dashboard", "layout-dashboard"],
    ["anagrafica.html", "Anagrafica", "id-card"],
    ["asset.html", "Asset", "boxes"],
    ["audit.html", "Audit", "clipboard-check"],
    ["manutenzione.html", "Manutenzione", "wrench"],
    ["prenotazioni.html", "Prenotazioni", "calendar"],
    ["finanze.html", "Finanze", "pie-chart"],
    ["conto.html", "Conto", "wallet"],
    ["consuntivo_25.html", "Consuntivo 2025", "file-text"],
    ["sicurezza.html", "Sicurezza", "shield"]
  ];

  const ACTIVE_KEY = "2m_active_property_id";
  const LOADED_KEY = "2m_active_property_loaded";
  const STATE_PREFIX = "2m_property_state";
  const DEFAULT_PROPERTY_ID = "MASOTTO4_39";
  const ALL_2EMME_ID = "ALL_2EMME";
  const EXCLUDED_AGGREGATE_IDS = new Set(["MASOTTO4_39"]);
  const PROPERTY_OFFSETS = {
    T29_9: 10000000,
    B32_718: 20000000,
    B32_719: 30000000,
    CH1_715: 40000000,
    MASOTTO4_39: 50000000
  };

  const SECTION_MAP = {
    masotto_prop_data: "property_master",
    masotto_assets_mobile_db: "assets_mobile",
    masotto_structural_assets_db: "structural_assets",
    masotto_finance_db: "finances",
    masotto_booking_db: "bookings",
    masotto_maint_db: "tickets",
    masotto_insurance_db: "insurance",
    masotto_utilities_db: "utilities",
    masotto_contacts_db: "contacts",
    masotto_maintenance_presets_db: "maintenance_presets",
    masotto_supply_presets_db: "supply_presets",
    masotto_reusable_inventory_db: "reusable_inventory"
  };

  function getMultiproperty(){
    return window.MASOTTO_MULTIPROPERTY_DB || null;
  }

  function getActivePropertyId(){
    const mp = getMultiproperty();
    const stored = localStorage.getItem(ACTIVE_KEY);
    if (stored === ALL_2EMME_ID) return ALL_2EMME_ID;
    if (mp && stored && mp.properties_by_id && mp.properties_by_id[stored]) return stored;
    if (mp && mp.default_property_id && mp.properties_by_id && mp.properties_by_id[mp.default_property_id]) return mp.default_property_id;
    if (mp && Array.isArray(mp.properties) && mp.properties[0]) return mp.properties[0].property_id;
    return DEFAULT_PROPERTY_ID;
  }

  function scopedKey(propertyId, lsKey){
    return `${STATE_PREFIX}_${propertyId}_${lsKey}`;
  }

  function persistLoadedProperty(){
    const loaded = localStorage.getItem(LOADED_KEY);
    if (!loaded) return;
    for (const lsKey of Object.keys(SECTION_MAP)) {
      const value = localStorage.getItem(lsKey);
      if (value !== null && value !== undefined) {
        localStorage.setItem(scopedKey(loaded, lsKey), value);
      }
    }
  }

  function makeNumericId(propertyId, rawId, index){
    const offset = PROPERTY_OFFSETS[propertyId] || 90000000;
    const parsed = parseInt(String(rawId || "").replace(/\D/g, ""), 10);
    return offset + (Number.isFinite(parsed) ? parsed : index + 1);
  }

  function cloneWithSource(item, propertyId, propertyName, section, index){
    const copy = JSON.parse(JSON.stringify(item || {}));
    copy.source_property_id = propertyId;
    copy.source_property_name = propertyName;
    copy.original_id = copy.id;
    if (["finances", "bookings", "tickets"].includes(section)) {
      copy.id = makeNumericId(propertyId, copy.id, index);
    } else if (["assets_mobile", "structural_assets"].includes(section)) {
      copy.id = `${propertyId}__${copy.id || index}`;
    }
    return copy;
  }

  function buildAggregateMaster(){
    const mp = getMultiproperty();
    if (!mp || !mp.properties_by_id || !Array.isArray(mp.properties)) return null;
    const included = mp.properties.filter(p => p.property_id && !EXCLUDED_AGGREGATE_IDS.has(p.property_id));
    const includedMasters = included
      .map(p => ((mp.properties_by_id[p.property_id] || {}).property_master || [])[0] || {})
      .filter(Boolean);
    const purchaseTotal = includedMasters.reduce((sum, p) => sum + (parseFloat(p.purchase_price_eur) || 0), 0);
    const purchaseDates = includedMasters.map(p => p.purchase_date).filter(Boolean).sort();
    const aggregate = {
      property_master: [{
        property_id: ALL_2EMME_ID,
        name: "Tutti alloggi 2EMME",
        address: "Portfolio 2EMME escluso Masotto Terrace View",
        owner: "2EMME / gestione societaria",
        manager: "2EMME Real Estate & Consulting",
        purchase_date: purchaseDates[0] || "2024-01-01",
        purchase_price_eur: purchaseTotal,
        activity_start_date: "2024-01-01",
        activity_start_note: "Aggregato gestionale degli alloggi 2EMME con attivita avviata dal 2024. Masotto Terrace View escluso.",
        tax_regime: "forfettario",
        tax_regime_label: "Aggregato alloggi societari - regime forfettario",
        vat_applicable: false,
        tax_rate_pct: 5,
        profitability_coefficient_pct: 40,
        effective_tax_rate_on_turnover_pct: 2,
        tax_formula_human: "Aggregato gestionale: imposta stimata = fatturato imponibile x 40% x 5%. Masotto Terrace View escluso.",
        receipt_issuer_type: "company_forfettario",
        receipt_issuer_name: "2EMME Real Estate & Consulting",
        receipt_issuer_label: "Regime forfettario - niente IVA",
        receipt_use_company_logo: true,
        company_legal_name: "2EMME Real Estate & Consulting",
        company_registered_office: "Via Pietro Colletta 70, 20137 Milano",
        company_vat_number: "IT13411850962",
        company_tax_code: "MSLMTT79E26B354D",
        company_rea: "MI 2721793",
        company_sdi: "JKKZDGR",
        company_logo_text: "2M"
      }],
      assets_mobile: [],
      structural_assets: [],
      finances: [],
      bookings: [],
      tickets: [],
      insurance: [],
      utilities: [],
      contacts: [],
      maintenance_presets: [],
      supply_presets: [],
      reusable_inventory: [],
      aggregate: true,
      aggregate_excludes: Array.from(EXCLUDED_AGGREGATE_IDS),
      source_database_version: mp.source || "multiproperty"
    };
    included.forEach(prop => {
      const db = mp.properties_by_id[prop.property_id] || {};
      for (const section of Object.values(SECTION_MAP)) {
        const rows = Array.isArray(db[section]) ? db[section] : [];
        if (["maintenance_presets", "supply_presets", "contacts", "reusable_inventory"].includes(section)) {
          if (!aggregate[section].length) aggregate[section] = JSON.parse(JSON.stringify(rows));
        } else {
          aggregate[section].push(...rows.map((row, index) => cloneWithSource(row, prop.property_id, prop.name, section, index)));
        }
      }
    });
    return aggregate;
  }

  function commitCurrentChanges(){
    const activeId = getActivePropertyId();
    const master = window.MASOTTO_DB || {};
    for (const [lsKey, section] of Object.entries(SECTION_MAP)) {
      const value = localStorage.getItem(lsKey);
      if (value === null || value === undefined) continue;
      try {
        const parsed = JSON.parse(value);
        master[section] = parsed;
        localStorage.setItem(scopedKey(activeId, lsKey), value);
      } catch(e) {}
    }
    if (activeId !== ALL_2EMME_ID) {
      const mp = getMultiproperty();
      if (mp && mp.properties_by_id) mp.properties_by_id[activeId] = master;
    }
    localStorage.setItem(LOADED_KEY, activeId);
    return true;
  }

  function getMasterForActive(){
    const mp = getMultiproperty();
    const activeId = getActivePropertyId();
    localStorage.setItem(ACTIVE_KEY, activeId);
    if (activeId === ALL_2EMME_ID) {
      window.MASOTTO_DB = buildAggregateMaster();
    } else if (mp && mp.properties_by_id && mp.properties_by_id[activeId]) {
      window.MASOTTO_DB = mp.properties_by_id[activeId];
    }
    return window.MASOTTO_DB || null;
  }

  async function loadFallbackMaster(){
    const res = await fetch(`masotto_complete_database.json?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("fetch failed");
    return await res.json();
  }

  function loadSection(master, activeId, lsKey, section, force){
    const saved = localStorage.getItem(scopedKey(activeId, lsKey));
    const current = localStorage.getItem(lsKey);
    const empty = !current || current === "null" || current === "[]" || current === "{}" || current === "undefined";
    const source = saved !== null && !force ? saved : JSON.stringify(master[section] ?? []);
    if (force || empty || localStorage.getItem(LOADED_KEY) !== activeId) {
      localStorage.setItem(lsKey, source);
    }
  }

  async function ensureMasterDB(force=false){
    try {
      let master = getMasterForActive();
      if (!master) master = await loadFallbackMaster();

      const activeId = getActivePropertyId();
      const loadedId = localStorage.getItem(LOADED_KEY);
      if (loadedId && loadedId !== activeId) persistLoadedProperty();

      try {
        const patchRes = await fetch(`masotto_bookings_patch.json?t=${Date.now()}`, { cache: "no-store" });
        if (patchRes.ok) {
          const patch = await patchRes.json();
          if (Array.isArray(patch.bookings)) {
            const current = Array.isArray(master.bookings) ? master.bookings : [];
            const byId = new Map(current.map(b => [String(b.id), b]));
            for (const b of patch.bookings) {
              if (b && b.id !== undefined && b.id !== null) byId.set(String(b.id), b);
            }
            master.bookings = Array.from(byId.values()).sort((a, b) => {
              const da = new Date(a.check_in || a.checkin || 0).getTime();
              const db = new Date(b.check_in || b.checkin || 0).getTime();
              return da - db;
            });
          }
        }
      } catch (patchErr) {
        console.warn("Booking patch merge skipped", patchErr);
      }

      for (const [lsKey, section] of Object.entries(SECTION_MAP)) {
        loadSection(master, activeId, lsKey, section, force);
      }

      localStorage.setItem(LOADED_KEY, activeId);
      const prop = (master.property_master || [])[0] || {};
      localStorage.setItem("active_property", prop.name || activeId);
      return true;
    } catch (e) {
      console.warn("DB sync failed", e);
      return false;
    }
  }

  function activePropertyMeta(){
    const mp = getMultiproperty();
    const activeId = getActivePropertyId();
    if (activeId === ALL_2EMME_ID) return { property_id: ALL_2EMME_ID, name: "Tutti alloggi 2EMME" };
    if (!mp || !Array.isArray(mp.properties)) return { property_id: activeId, name: "Masotto Terrace" };
    return mp.properties.find(p => p.property_id === activeId) || mp.properties[0] || { property_id: activeId, name: activeId };
  }

  function propertyOptions(){
    const mp = getMultiproperty();
    const activeId = getActivePropertyId();
    if (!mp || !Array.isArray(mp.properties)) return "";
    const aggregateSelected = activeId === ALL_2EMME_ID ? "selected" : "";
    const aggregate = `<option value="${ALL_2EMME_ID}" ${aggregateSelected}>Tutti alloggi 2EMME</option>`;
    return aggregate + mp.properties.map(p => {
      const selected = p.property_id === activeId ? "selected" : "";
      return `<option value="${p.property_id}" ${selected}>${p.name}</option>`;
    }).join("");
  }

  function mountSidebar(){
    if (window.__MS_SIDEBAR_DONE && document.getElementById("msSidebar")) return;
    try {
      document.querySelectorAll("aside.sidebar, div.sidebar, #sidebar, [data-legacy-sidebar=\"1\"], .ms-sidebar").forEach(el => el.remove());
    } catch(e) {}

    const path = (location.pathname.split("/").pop() || "index.html");
    const nav = PAGES.map(([href,label,icon]) => {
      const active = (href.toLowerCase() === path.toLowerCase()) ? "active" : "";
      return `<a class="${active}" href="${href}"><i data-lucide="${icon}" class="w-4 h-4"></i><span>${label}</span></a>`;
    }).join("");

    const meta = activePropertyMeta();
    const sidebar = document.createElement("aside");
    sidebar.className = "ms-sidebar";
    sidebar.id = "msSidebar";
    sidebar.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg" style="background:linear-gradient(135deg,#004D54,#10b981)">2M</div>
        <div><div class="text-white font-bold leading-tight">${meta.name || "2EMME Portfolio"}</div><div class="ms-chip">multi-property mode</div></div>
      </div>
      <div class="mb-4">
        <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Alloggio</label>
        <select id="msPropertySelect" class="w-full rounded-lg px-2 py-2 text-xs font-bold outline-none" style="background:#1e293b;border:1px solid rgba(255,255,255,.12);color:white;">
          ${propertyOptions()}
        </select>
      </div>
      <nav class="ms-nav space-y-1">${nav}</nav>
      <div class="mt-6 p-3 rounded-xl" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);">
        <button id="msSaveBtn" class="w-full text-xs font-bold px-3 py-2 rounded-lg mb-2" style="background:rgba(16,185,129,.18);border:1px solid rgba(16,185,129,.38);color:#bbf7d0;">Salva Modifiche</button>
        <button id="msSyncBtn" class="w-full text-xs font-bold px-3 py-2 rounded-lg" style="background:rgba(45,212,191,.15);border:1px solid rgba(45,212,191,.35);color:#a7f3d0;">Sincronizza Dati</button>
      </div>`;

    const mainWrap = document.createElement("div");
    mainWrap.className = "ms-main";
    while (document.body.firstChild) mainWrap.appendChild(document.body.firstChild);
    document.body.appendChild(sidebar);
    document.body.appendChild(mainWrap);

    const topbar = document.createElement("div");
    topbar.className = "ms-topbar p-3 flex items-center justify-between lg:hidden";
    topbar.innerHTML = `<button id="msToggle" class="px-3 py-2 rounded-lg text-white text-xs font-bold" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10);">☰ Menu</button><div class="text-white font-bold text-sm">${meta.name || "2EMME Portfolio"}</div><div style="width:64px"></div>`;
    mainWrap.prepend(topbar);
    topbar.querySelector("#msToggle").addEventListener("click", () => sidebar.classList.toggle("open"));

    const select = sidebar.querySelector("#msPropertySelect");
    if (select) {
      select.addEventListener("change", async () => {
        persistLoadedProperty();
        localStorage.setItem(ACTIVE_KEY, select.value);
        await ensureMasterDB(false);
        location.reload();
      });
    }

    sidebar.querySelector("#msSyncBtn").addEventListener("click", async () => {
      persistLoadedProperty();
      sidebar.querySelector("#msSyncBtn").textContent = "Syncing...";
      await ensureMasterDB(true);
      location.reload();
    });

    sidebar.querySelector("#msSaveBtn").addEventListener("click", () => {
      commitCurrentChanges();
      const btn = sidebar.querySelector("#msSaveBtn");
      btn.textContent = "Salvato";
      setTimeout(() => { btn.textContent = "Salva Modifiche"; }, 1200);
    });

    window.__MS_SIDEBAR_DONE = true;
    try { if (window.lucide) window.lucide.createIcons(); } catch(e) {}
  }

  window.ensureMasterDB = ensureMasterDB;
  window.mountSidebar = mountSidebar;
  window.msPersistLoadedProperty = persistLoadedProperty;
  window.msCommitCurrentChanges = commitCurrentChanges;
  window.msReady = async function(force=false){
    await ensureMasterDB(force);
    mountSidebar();
    return true;
  };

  document.addEventListener("DOMContentLoaded", async () => {
    await window.msReady(false);
  });
})();
