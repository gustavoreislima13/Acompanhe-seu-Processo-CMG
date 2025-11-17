const announcements = [ { title: "📢 Novidades a Caminho!", text: "Em breve, lançaremos novos planos de monitoramento financeiro. Aguarde!" }, { title: "💡 Cartão de crédito", text: "Destrave o melhor cartão para negativados do BRASIL !" }, { title: "🔒 Sua Segurança", text: "Nunca compartilhe sua senha. Nossa equipe jamais solicitará suas credenciais." } ];
let currentAnnouncementIndex = 0, announcementInterval = null, activeClientData = null;

document.addEventListener('DOMContentLoaded', () => {
    
    // LISTA DE ALUNOS (LOGIN E SENHA)
    const studentUsers = {
        "branquinhafelix85@gmail.com": "branqui85",
        "jennifersantanna.rh@gmail.com": "jenniRH",
        "Biancaasantana007@gmail.com": "bianca007",
        "helloysasantos61@gmail.com": "hello61",
        "nunnesnicoly@gmail.com": "nicoly25",
        "Vanyaqueiroz30@gmail.com": "vanya30",
        "pluuh.cissa4@gmail.com": "cissa04",
        "jacquelinesiilva2023@gmail.com": "jacque23",
        "arianebispo820@gmail.com": "ariane820",
        "beugalvao17@gmail.com": "galvao17",
        "Maaryy2090@gmail.com": "mary2090",
        "annanajasile@yahoo.com.br": "anna2025",
        "Dantas160581@gmail.com": "dantas81",
        "Karllagabrielle712@gmail.com": "karlla712",
        "Correiacarol328@gmail.com": "carol328", // Corrigido de gamil para gmail
        "stm.decastro@gmail.com": "castro25",
        "rafaellasampaio666@gmail.com": "rafa666",
        "valverdeemile6@gmail.com": "emile06"
    };

    // ESTRUTURA DE DADOS DOS CURSOS
    const courseData = [
        {
            moduleTitle: "Módulo 1: Boas-vindas & Introdução",
            lessons: [
                { title: "Aula 1.1:  O que é o Limpa Nome", videoUrl: "https://www.youtube.com/embed/EPkoiK_f6vo?si=V6N2xT24QlHja6pe" },
                { title: "Aula 1.2: Por que as pessoas precisam desse serviço?", videoUrl: "https://www.youtube.com/embed/EjPEMIALvcM?si=fW5CoVYCXSFC0aIn" },
                { title: "Aula 1.3: Como funciona o Limpa Nome", videoUrl: "https://www.youtube.com/embed/_dLjYFkFdgc?si=uhRo8lri1Y2Pk-bR" },
                { title: "Aula 1.4: Órgãos de Proteção ao Crédito", videoUrl: "https://www.youtube.com/embed/Zgh8WtXbQWU?si=vURFtZgmit3dOty1" },
                { title: "Aula 1.5: Prazos", videoUrl: "https://www.youtube.com/embed/V_d4MdCz324?si=4pxWcczk21bHHQ6w" },
                { title: "Aula 1.6: Garantias", videoUrl: "https://www.youtube.com/embed/vnK8I5BWDtU?si=bwbNBEWsbv5m8fnZ" },
                { title: "Aula 1.7: Documentações", videoUrl: "https://www.youtube.com/embed/j3AzNHJYx8I?si=rkmJavMoKGmMz-9t" },
            ]
        },
        {
            moduleTitle: "Módulo 2: Nossos Produtos",
            lessons: [
                { title: "Aula 2.1: Produto - Limpeza de Nome", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.2: Produto - Limpeza Bacen", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.3: Produto - Rating de Crédito", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.4: Produto - Aumento de Score", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.5: Produto - Limpeza Jus Brasil", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.6: Consultas de Crédito (Parceiro)", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.7: Planos de Monitoramento (Cliente)", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 2.8: Conclusão do Módulo 2", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" }
            ]
        },
        {
            moduleTitle: "Módulo 3: Vendas e Próximos Passos",
            lessons: [
                { title: "Aula 3.1: Como Captar Clientes", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.2: Abordagem e Script de Venda", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.3: Quebrando Objeções Comuns", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.4: Pós-Venda e Fidelização", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.5: Usando o Material de Divulgação", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.6: Como Lançar no Sistema", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.7: Prova Social e Depoimentos", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" },
                { title: "Aula 3.8: Prova Final e Certificado", videoUrl: "https://www.youtube.com/embed/SEU-VIDEO-ID-AQUI" }
            ]
        }
    ];

    const loginScreen = document.getElementById('login-screen');
    const errorMessage = document.getElementById('error-message');
    const docInput = document.getElementById('docInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginButton = document.getElementById('loginButton');
    const clientAppLayout = document.getElementById('app-layout');
    const adminDashboardView = document.getElementById('admin-dashboard-view');
    const partnerDashboardView = document.getElementById('partner-dashboard-view');
    const menuOverlay = document.getElementById('menu-overlay');

    loginButton.addEventListener('click', () => {
        const userInput = docInput.value.trim();
        const password = passwordInput.value;
        const docNumber = userInput.replace(/\D/g, '');
        const expectedClientPassword = docNumber.substring(0, 4);

        if (userInput === 'admin' && password === '0000') {
            // LOGIN ADMIN
            loginScreen.style.display = 'none';
            adminDashboardView.style.display = 'block';
            clientAppLayout.style.display = 'none';
            partnerDashboardView.style.display = 'none';
            renderAdminDashboard();

        } else if (userInput === 'parceiro' && password === 'parceiro123') {
            // LOGIN PARCEIRO (COMPLETO)
            loginScreen.style.display = 'none';
            adminDashboardView.style.display = 'none';
            clientAppLayout.style.display = 'none';
            partnerDashboardView.style.display = 'grid';
            setupPartnerDashboard(false); // false = não é aluno restrito

        } else if (studentUsers.hasOwnProperty(userInput) && password === studentUsers[userInput]) {
            // LOGIN ALUNO (APENAS CURSO)
            loginScreen.style.display = 'none';
            adminDashboardView.style.display = 'none';
            clientAppLayout.style.display = 'none';
            partnerDashboardView.style.display = 'grid';
            setupPartnerDashboard(true); // true = é aluno restrito

        } else if (clientDatabase.hasOwnProperty(docNumber) && password === expectedClientPassword) {
            // LOGIN CLIENTE FINAL
            activeClientData = { ...clientDatabase[docNumber], doc: docNumber };
            loginScreen.style.display = 'none';
            adminDashboardView.style.display = 'none';
            partnerDashboardView.style.display = 'none';
            clientAppLayout.style.display = 'grid';
            setupUIForUser(activeClientData);

        } else {
            errorMessage.textContent = 'Credenciais inválidas.';
        }
    });

    function performLogout() {
        adminDashboardView.style.display = 'none';
        clientAppLayout.style.display = 'none';
        partnerDashboardView.style.display = 'none';
        loginScreen.style.display = 'flex';
        docInput.value = ''; passwordInput.value = '';
        errorMessage.textContent = '';
        if (announcementInterval) clearInterval(announcementInterval);
    }
    
    document.getElementById('admin-logout-btn').addEventListener('click', (e) => { e.preventDefault(); performLogout(); });
    
    function renderAdminDashboard() {
        const clients = Object.entries(clientDatabase);
        const totalClients = clients.length;
        const pendingClients = clients.filter(([, data]) => data.status === 'EM TRANSIÇÃO DE ENVIO').length;
        const finishedClients = clients.filter(([, data]) => data.status === 'PROCESSO FINALIZADO').length;
        let revenuePending = 0, revenueReceived = 0;
        clients.forEach(([, data]) => {
            if (data.historicoPagamentos) {
                data.historicoPagamentos.forEach(p => {
                    const valor = parseFloat(p.valor.replace(',', '.'));
                    if (p.status === 'pendente') revenuePending += valor;
                    else if (p.status === 'pago') revenueReceived += valor;
                });
            }
        });
        document.getElementById('kpi-total-clients').textContent = totalClients;
        document.getElementById('kpi-pending-clients').textContent = pendingClients;
        document.getElementById('kpi-finished-clients').textContent = finishedClients;
        document.getElementById('kpi-revenue-pending').textContent = revenuePending.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        renderFinancialChart(revenueReceived, revenuePending);
        renderClientTable(clients);
    }

    function renderFinancialChart(received, pending) {
        const ctx = document.getElementById('financial-chart').getContext('2d');
        if (window.myFinancialChart) window.myFinancialChart.destroy();
        window.myFinancialChart = new Chart(ctx, {
            type: 'doughnut', data: { labels: ['Recebidas', 'A Receber'], datasets: [{ data: [received, pending], backgroundColor: ['#10b981', '#f59e0b'], borderWidth: 1 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: c => `${c.label}: ${c.parsed.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}` } } } }
        });
    }

    function renderClientTable(clients) {
        const tableBody = document.querySelector('#client-table tbody');
        tableBody.innerHTML = '';
        clients.forEach(([id, data]) => {
            const row = tableBody.insertRow();
            const hasPendingPayment = data.historicoPagamentos && data.historicoPagamentos.some(p => p.status === 'pendente');
            const paymentStatusHTML = hasPendingPayment ? `<span class="payment-status-pending">Pendente</span>` : `<span class="payment-status-ok">Em dia</span>`;
            row.innerHTML = `<td data-label="Cliente">${data.name}</td><td data-label="Documento">${id}</td><td data-label="Status">${data.status}</td><td data-label="Pagamento">${paymentStatusHTML}</td><td data-label="Links" class="client-links">${(data.materiais || []).map(l => `<a href="${l.url}" target="_blank">${l.nome}</a>`).join('')}</td>`;
        });
    }

    document.getElementById('search-input').addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('#client-table tbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    });

    function setupUIForUser(userData) {
        const sidebar = clientAppLayout.querySelector('.sidebar');
        document.getElementById('username-display').textContent = userData.name.split(' ')[0];
        document.getElementById('client-nav-ul').innerHTML = `
            <li><a href="#" class="nav-link" data-view="dashboard-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Dashboard</a></li>
            <li><a href="#" class="nav-link" data-view="payments-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>Pagamentos</a></li>
            <li><a href="#" class="nav-link" data-view="consultas-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Consultas</a></li>
            <li><a href="#" class="nav-link" data-view="plans-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Planos</a></li>
            <li><a href="#" class="nav-link" data-view="credit-card-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>Cartão de Crédito</a></li>
        `;
        addNavListeners(clientAppLayout, '#client-nav-ul .nav-link', '.view-content', '#page-title');
        populateDashboard(userData); populatePaymentsView(userData); populateConsultasView(); populatePlansView(); populateCreditCardView();
        document.querySelector('#client-nav-ul .nav-link').click();

        const toggleClientMobileMenu = () => { sidebar.classList.toggle('open'); menuOverlay.classList.toggle('open'); };
        document.getElementById('client-mobile-menu-button').onclick = toggleClientMobileMenu;
        document.getElementById('client-close-menu-button').onclick = toggleClientMobileMenu;
        clientAppLayout.querySelector('.logout-button').addEventListener('click', performLogout);
    }

    function addNavListeners(parentLayout, linkSelector, viewSelector, titleSelector) {
        const navLinks = parentLayout.querySelectorAll(linkSelector);
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                parentLayout.querySelectorAll(viewSelector).forEach(view => view.style.display = 'none');
                document.getElementById(link.dataset.view).style.display = 'block';
                parentLayout.querySelector(titleSelector).textContent = link.textContent.trim();
                const sidebar = parentLayout.querySelector('.sidebar');
                if (sidebar.classList.contains('open')) {
                     sidebar.classList.remove('open');
                     menuOverlay.classList.remove('open');
                }
            });
        });
    }

    function populateDashboard(clientData) {
        const dashboardContainer = document.getElementById('dashboard-view');
        const nextPayment = clientData.historicoPagamentos ? clientData.historicoPagamentos.find(p => p.status === 'pendente') : null;
        dashboardContainer.innerHTML = `<section class="summary-cards"><div class="summary-card"><div class="icon" style="background-color: #dbeafe; color: #3b82f6;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="text"><h3>Status do Processo</h3><p>${clientData.status.replace(/-/g, ' ')}</p></div></div><div class="summary-card"><div class="icon" style="background-color: #fef3c7; color: #f59e0b;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><div class="text"><h3>Próxima Parcela</h3><p>${nextPayment ? nextPayment.data : "Em dia"}</p></div></div><div class="summary-card"><div class="icon" style="background-color: #d1fae5; color: #10b981;"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div><div class="text"><h3>Materiais</h3><p>${(clientData.materiais || []).length} Arquivos</p></div></div></section><section class="dashboard-card announcement-card"><h2 id="announcement-title"></h2><p id="announcement-text"></p></section><section class="dashboard-grid"><div class="dashboard-card"><h2>Andamento da Liminar</h2><div id="timeline-container"></div></div><div class="dashboard-card"><h2>Meus Materiais</h2><ul id="materiais-list"></ul></div></section>`;
        const statusInfo = getStatusInfo(clientData.status);
        const timelineContainer = document.getElementById('timeline-container');
        const steps = [{ title: 'Análise', description: 'Documentos em análise.', icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="m22 22-3-3"/></svg>' },{ title: 'Processo', description: 'Ação protocolada.', icon: '<svg viewBox="0 0 24 24"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.26 10.05A6.5 6.5 0 0 0 8 16.5c1.93 0 3.68-.93 4.74-2.45"/><path d="M12 12V6.5"/><path d="M12 22a1 1 0 0 0 1-1v-2.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5V17a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V21a1 1 0 0 0 1 1z"/></svg>' },{ title: 'Notificação', description: 'Liminar concedida!', icon: '<svg viewBox="0 0 24 24"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10z"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' },{ title: 'Finalizado', description: 'Processo concluído.', icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>' }];
        timelineContainer.innerHTML = `<div class="timeline"><div id="progress-bar"></div>${steps.map((step, index) => `<div class="step ${index + 1 === statusInfo.step ? 'active' : ''} ${index + 1 < statusInfo.step ? 'completed' : ''}"><div class="step-icon">${step.icon}</div><div class="step-content"><p class="step-title">${step.title}</p><p class="step-description">${step.description}</p></div></div>`).join('')}</div><div id="status-message">${statusInfo.message}</div>`;
        updateTimelineProgressBar(statusInfo.step, steps.length);
        document.getElementById('materiais-list').innerHTML = (clientData.materiais || []).map(m => `<li><a href="${m.url}" target="_blank">📄 ${m.nome}</a></li>`).join('');
        showNextAnnouncement();
        announcementInterval = setInterval(showNextAnnouncement, 7000);
    }

    function populatePaymentsView(clientData) {
        const container = document.getElementById('payments-view');
        if (clientData.historicoPagamentos && clientData.historicoPagamentos.length > 0) {
            let tableRowsHTML = clientData.historicoPagamentos.map(pagamento => {
                const isPendente = pagamento.status === 'pendente';
                const statusClass = isPendente ? 'status-pendente' : 'status-pago';
                const statusText = isPendente ? 'Pendente' : 'Pago';
                const actionButton = isPendente ? `<button class="regularizar-btn" data-valor="${pagamento.valor}" data-referencia="${pagamento.referencia}">Regularizar</button>`: '✔';
                return `<tr><td>${pagamento.referencia}</td><td>${pagamento.data}</td><td>R$ ${pagamento.valor}</td><td><span class="status-badge ${statusClass}">${statusText}</span></td><td>${actionButton}</td></tr>`;
            }).join('');
            container.innerHTML = `<div class="payment-history-card"><h2>Histórico de Pagamentos</h2><div class="history-table-container"><table class="payment-history-table"><thead><tr><th>Referência</th><th>Data</th><th>Valor</th><th>Status</th><th>Ação</th></tr></thead><tbody>${tableRowsHTML}</tbody></table></div></div>`;
            document.querySelectorAll('.regularizar-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const valor = button.dataset.valor;
                    const referencia = button.dataset.referencia;
                    const doc = activeClientData.doc;
                    handlePixPayment(valor, `REG-${doc.substring(0,5)}-${referencia.substring(0,3)}`, `Pagamento: ${referencia}`);
                });
            });
        } else {
            container.innerHTML = `<div class="payment-card ok"><h3>🎉 Tudo em dia por aqui!</h3><div class="no-payments-message"><p>Nenhum histórico de pagamento encontrado.</p></div></div>`;
        }
    }

    function populateConsultasView() {
        document.getElementById('consultas-view').innerHTML = `<div class="payment-card consulta-card"><h3>Consultar CPF ou CNPJ</h3><p>Custo de <strong>R$ 8,00</strong> por consulta. Preencha os dados, realize o pagamento e a solicitação será enviada.</p><form id="consulta-form"><input type="hidden" name="solicitante_nome" value="${activeClientData.name}"><input type="hidden" name="solicitante_doc" value="${activeClientData.doc}"><div class="form-group"><label for="doc_a_consultar">CPF ou CNPJ para consulta</label><input type="text" id="doc_a_consultar" name="doc_a_consultar" class="input-field" required></div><button type="submit" class="form-button">Solicitar e Pagar R$ 8,00</button></form><div id="form-status"></div></div>`;
        document.getElementById('consulta-form').addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target; const data = new FormData(form); const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = 'Enviando solicitação...'; statusDiv.style.color = 'var(--text-light)';
        try {
            const response = await fetch('https://formspree.io/f/xandlqrb', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                statusDiv.textContent = 'Solicitação enviada! Gerando PIX...';
                statusDiv.style.color = 'var(--success-color)'; form.reset();
                setTimeout(() => handlePixPayment('8.00', `CONSULTA-${data.get('doc_a_consultar').substring(0,5)}`, 'Taxa de Consulta'), 1000);
            } else { throw new Error('Erro no servidor.'); }
        } catch (error) { statusDiv.textContent = 'Houve um erro. Tente novamente.'; statusDiv.style.color = 'var(--danger-color)'; }
    }

    function populatePlansView() {
        const plansContainer = document.getElementById('plans-view'); const checkIcon = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
        plansContainer.innerHTML = `<p style="text-align: center; margin-bottom: 40px; font-size: 1.1em; color: var(--text-dark);">Compare os benefícios e veja como podemos proteger e impulsionar sua vida financeira com monitoramento contínuo.</p><div class="plans-container"><div class="plan-card"><h3>Essencial</h3><p class="description">Proteção para o seu CPF</p><div class="plan-price"><span class="currency">R$</span><span class="amount">14,90</span><span class="period">/mês</span></div><ul class="plan-features"><li>${checkIcon}Monitoramento de CPF 24h com alertas</li><li>${checkIcon}Relatório de Score detalhado</li><li>${checkIcon}Acesso a ofertas exclusivas de negociação</li><li>${checkIcon}1 Consultas CPF ou CNPJ</li></ul><a href="#" class="plan-button secondary">Começar com Essencial</a></div><div class="plan-card popular"><div class="plan-badge">Mais Popular</div><h3>Plus</h3><p class="description">Sua saúde financeira completa</p><div class="plan-price"><span class="currency">R$</span><span class="amount">29,90</span><span class="period">/mês</span></div><ul class="plan-features"><li>${checkIcon}Tudo do Essencial, e mais:</li><li>${checkIcon}Plano de Ação para <strong style="color:var(--primary-color);">Aumentar Score</strong></li><li>${checkIcon}Ferramenta de <strong style="color:var(--primary-color);">Orçamento Pessoal</strong></li><li>${checkIcon}Canal de <strong style="color:var(--primary-color);">Atendimento Prioritário</strong></li><li>${checkIcon}2 Consultas CPF ou CNPJ</li></ul><a href="#" class="plan-button primary">Escolher Plano Plus</a></div><div class="plan-card"><h3>Premium</h3><p class="description">Consultoria e suporte VIP</p><div class="plan-price"><span class="currency">R$</span><span class="amount">79,90</span><span class="period">/mês</span></div><ul class="plan-features"><li>${checkIcon}Tudo do Plano Plus, e mais:</li><li>${checkIcon}Consultoria Financeira Pessoal <br>(2x/mês)</li><li>${checkIcon}Assistente Pessoal para Negociação de Dívidas</li><li>${checkIcon}Relatório Financeiro Completo e Personalizado</li><li>${checkIcon}4 Consultas CPF ou CNPJ</li></ul><a href="#" class="plan-button secondary">Assinar Premium</a></div></div>`;
    }

    function getStatusInfo(statusName) {
        const statuses = { "EM TRANSIÇÃO DE ENVIO": { step: 1, message: "Sua documentação foi recebida e está na fila para análise judicial." }, "LIMINAR CONCEDIDA": { step: 3, message: "Decisão judicial favorável! Agora entra na fase de notificar os órgãos de crédito." }, "AGUARDANDO DECISÃO-ATUALIZAÇÃO": { step: 3, message: "Aguardando os órgãos de crédito cumprirem a decisão judicial." }, "RE-PROTOCOLO EMITIDO": { step: 2, message: "Documentação re-emitida e protocolada." }, "PROCESSO FINALIZADO": { step: 4, message: "Parabéns! Seu processo foi concluído com sucesso." } };
        return statuses[statusName] || { step: 0, message: "Status não encontrado." };
    }

    function updateTimelineProgressBar(currentStep, totalSteps) {
        const progressBar = document.getElementById('progress-bar'); if (!progressBar) return; const progress = currentStep > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 80 + 10 : 0; if (window.innerWidth <= 768) { progressBar.style.height = `${(currentStep-1)*33.3}%`; } else { progressBar.style.width = `${progress}%`; }
    }

    function showNextAnnouncement() {
        const card = document.querySelector('.announcement-card'); if (card) { card.classList.add('fading'); setTimeout(() => { const ann = announcements[currentAnnouncementIndex]; if (ann) { card.querySelector('h2').textContent = ann.title; card.querySelector('p').textContent = ann.text; } currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length; card.classList.remove('fading'); }, 400); }
    }
    function populateCreditCardView() { /* ... Lógica do cartão de crédito ... */ }
    
    // FUNÇÃO MODIFICADA PARA ACEITAR FLAG DE ALUNO
    function setupPartnerDashboard(isStudent = false) {
        const sidebar = partnerDashboardView.querySelector('.sidebar');
        const userLabel = isStudent ? 'Aluno' : 'Parceiro';
        document.getElementById('partner-username-display').textContent = userLabel;
        
        let navHtml = '';

        if (isStudent) {
            // MENU REDUZIDO PARA ALUNOS (APENAS CURSOS)
            navHtml = `
                <li><a href="#" class="partner-nav-link" data-view="partner-cursos-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></svg>Cursos</a></li>
            `;
        } else {
            // MENU COMPLETO PARA PARCEIROS
            navHtml = `
                <li><a href="#" class="partner-nav-link" data-view="partner-consultas-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Consultas</a></li>
                <li><a href="#" class="partner-nav-link" data-view="partner-planos-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4h5m0 0v-4"></path></svg>Planos</a></li>
                <li><a href="#" class="partner-nav-link" data-view="partner-pacotes-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>Pacotes</a></li>
                <li><a href="#" class="partner-nav-link" data-view="partner-cursos-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></svg>Cursos</a></li>
                <li><a href="#" class="partner-nav-link" data-view="partner-materiais-view"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>Materiais</a></li>
            `;
        }

        document.getElementById('partner-nav-ul').innerHTML = navHtml;
        
        const partnerConsultas = ["AÇÕES E PROCESSOS JUDICIAS CNPJ", "AVALIE CREDITO CNPJ", "AVALIE CREDITO CPF", "AÇÕES E PROCESSOS JUDICIAS CPF", "AVALIE CRÉDITO COMPLETA + SCORE CNPJ", "AVALIE CRÉDITO COMPLETA + SCORE CPF", "BOA VISTA + CADIN + SCORE CNPJ", "BOA VISTA + CADIN + SCORE CPF", "BOA VISTA + CENPROT + SCORE CNPJ", "BOA VISTA + CENPROT + SCORE CPF", "BOA VISTA + SCORE CNPJ", "BOA VISTA + SCORE CPF", "BOA VISTA SCPC CNPJ", "BOA VISTA SCPC CPF", "CADIN PGFN", "CCF + PROTESTO NACIONAL", "CONCENTRE RATING SCORE CPF", "CREDITO TOTAL + CENPROT CNPJ", "CONSULTA COMPLETA CPF / CNPJ", "CONSULTA COMPLETA PREMIUM CPF / CNPJ", "CREDITO TOTAL + SCORE CPF", "CREDITO TOTAL + SCORE CNPJ", "CREDITO TOTAL + CENPROT CPF", "CREDITO TOTAL CADIN + SCORE CNPJ", "CREDITO TOTAL CADIN + SCORE CPF", "DPA CNPJ + SCORE", "DPA CPF + SCORE", "PROTESTO NACIONAL", "PROTESTO NACIONAL + DADOS CADASTRAIS", "PROTESTO NACIONAL + DADOS CADASTRAIS + SCORE", "QUOD CNPJ", "QUOD CPF", "QUOD + SCORE CNPJ", "QUOD + SCORE CPF", "QUOD SCORE CNPJ + CADIN", "QUOD SCORE CPF + CADIN", "QUOD SCORE CNPJ + CENPROT", "QUOD SCORE CPF + CENPROT", "QUOD + BVS + CENPROT CPF/CNPJ", "RATING BANCARIO + SCORE CPF / CNPJ", "RELATÓRIO BASICO + SCORE CPF/CNPJ", "SCR + CREDITO TOTAL + SCORE CNPJ", "SCR + CREDITO TOTAL + SCORE CPF", "SCR + SCORE", "SER BVS + SCORE CNPJ", "SER BVS + SCORE CPF", "SER BVS CENPROT + SCORE CNPJ", "SER BVS CENPROT + SCORE CPF", "SER CNPJ", "SER+SCORE CPF", "SER CREDNET CPF / CNPJ", "SER + SPC + SCORE CNPJ", "SER + SPC +SCORE CPF", "SER PRIME + SCORE", "SER + CADIN SCORE CPF", "SER + CENPROT SCORE CPF", "SER + SPC + CADIN SCORE CNPJ", "SER + SPC + CADIN SCORE CPF", "SER + SPC + CENPROT SCORE CNPJ", "SER + SPC + CENPROT SCORE CPF"];
        document.getElementById('consulta-type-select').innerHTML = partnerConsultas.map(c => `<option value="${c}">${c}</option>`).join('');

        // Ouvintes de eventos para formulários (só funcionarão se o HTML estiver visível, sem problemas se estiver oculto)
        document.getElementById('partner-consulta-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const docToQuery = document.getElementById('consulta-doc-input').value;
            if (!docToQuery) { alert('Por favor, digite um documento para consultar.'); return; }
            const price = "12.00";
            const reference = `PARC-${docToQuery.replace(/\D/g, '').substring(0, 6)}`;
            handlePixPayment(price, reference, `Consulta Parceiro`);
        });
        
        document.getElementById('buy-consultas-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const select = document.getElementById('consultas-qty-select');
            const valor = select.value;
            const textoOpcao = select.options[select.selectedIndex].text;
            if (!valor) { alert('Por favor, selecione uma quantidade.'); return; }
            const modalTitle = `Compra de ${textoOpcao}`;
            const reference = `PACOTE-CONSULTA-${Date.now()}`;
            handlePixPayment(valor, reference, modalTitle);
        });

        document.querySelectorAll('.buy-package-btn').forEach(button => {
            button.addEventListener('click', e => {
                e.preventDefault();
                const valor = button.dataset.valor;
                const servico = button.dataset.servico;
                const modalTitle = `Compra de ${servico}`;
                const reference = `PACOTE-${servico.replace(/\s+/g, '')}-${Date.now()}`;
                handlePixPayment(valor, reference, modalTitle);
            });
        });

        // CARREGA A PLATAFORMA DE CURSOS
        populatePartnerCursosView();

        addNavListeners(partnerDashboardView, '.partner-nav-link', '.partner-view-content', '#partner-page-title');
        
        // Clica no primeiro item do menu (se for aluno, será cursos)
        document.querySelector('#partner-nav-ul .partner-nav-link').click();

        const togglePartnerMobileMenu = () => { sidebar.classList.toggle('open'); menuOverlay.classList.toggle('open'); };
        document.getElementById('partner-mobile-menu-button').onclick = togglePartnerMobileMenu;
        document.getElementById('partner-close-menu-button').onclick = togglePartnerMobileMenu;
        document.getElementById('partner-logout-btn').addEventListener('click', performLogout);
    }

    function populatePartnerCursosView() {
        const container = document.getElementById('partner-cursos-view');
        
        let html = `
            <div class="courses-layout">
                <div class="course-video-player dashboard-card">
                    <h2 id="course-video-title">Selecione uma aula para começar</h2>
                    <div class="video-wrapper">
                        <iframe id="course-video-iframe" 
                                src="about:blank" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="course-module-list dashboard-card">
                    <h2>Módulos do Curso</h2>
        `;
    
        courseData.forEach((module, moduleIndex) => {
            html += `
                <details class="course-module" ${moduleIndex === 0 ? 'open' : ''}>
                    <summary class="module-title">${module.moduleTitle}</summary>
                    <ul class="lesson-list">
                        ${module.lessons.map(lesson => `
                            <li>
                                <a href="#" class="lesson-link" data-video-url="${lesson.videoUrl}" data-video-title="${lesson.title}">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.26a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                                    <span>${lesson.title}</span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </details>
            `;
        });
    
        html += `
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    
        // Adicionar event listeners para os links das aulas
        container.querySelectorAll('.lesson-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                container.querySelectorAll('.lesson-link.active').forEach(activeLink => activeLink.classList.remove('active'));
                link.classList.add('active');
                const videoTitle = document.getElementById('course-video-title');
                const videoIframe = document.getElementById('course-video-iframe');
                videoTitle.textContent = link.dataset.videoTitle;
                videoIframe.src = link.dataset.videoUrl;
            });
        });
    }

    menuOverlay.addEventListener('click', () => {
        document.querySelectorAll('.sidebar.open').forEach(s => s.classList.remove('open'));
        menuOverlay.classList.remove('open');
    });

    function handlePixPayment(amount, reference, modalTitle) {
        const amountAsNumber = parseFloat(amount.replace(',', '.')).toFixed(2);
        const modal = document.getElementById('payment-modal');
        const pixCodeInput = document.getElementById('pix-code');
        const copyBtn = document.getElementById('copy-pix-btn');
        document.getElementById('modal-title').textContent = modalTitle;
        document.getElementById('qrcode-container').innerHTML = '';
        const pixKey = "Contato.cobecode@gmail.com";
        const merchantName = "CMG CONSULTORIA";
        const merchantCity = "SAO PAULO";
        const txid = reference.replace(/[^a-zA-Z0-9]/g, '').substring(0, 25) || '***';
        const pixPayload = generatePixPayload(pixKey, amountAsNumber, txid, merchantName, merchantCity);
        pixCodeInput.value = pixPayload;
        new QRCode(document.getElementById('qrcode-container'), { text: pixPayload, width: 200, height: 200 });
        copyBtn.textContent = 'Copiar';
        copyBtn.onclick = () => { navigator.clipboard.writeText(pixCodeInput.value).then(() => { copyBtn.textContent = 'Copiado!'; }); };
        const whatsappMessage = `Olá! Envio o comprovante de: ${modalTitle}, no valor de R$ ${amount}.`;
        document.getElementById('whatsapp-link').href = `https://wa.me/5511995688690?text=${encodeURIComponent(whatsappMessage)}`;
        modal.style.display = 'flex';
        const closeModal = () => modal.style.display = 'none';
        modal.querySelector('.close-modal').onclick = closeModal;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    function crc16(data) {
        let crc = 0xFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return ('0000' + (crc & 0xFFFF).toString(16).toUpperCase()).slice(-4);
    }

    function generatePixPayload(pixKey, amount, txid, merchantName, merchantCity) {
        const formatField = (id, value) => { const len = value.length.toString().padStart(2, '0'); return `${id}${len}${value}`; };
        const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9\s]/g, '').trim();
        const payloadFormat = '000201';
        const merchantAccountInfo = formatField('26', formatField('00', 'br.gov.bcb.pix') + formatField('01', pixKey));
        const merchantCategoryCode = '52040000';
        const transactionCurrency = '5303986';
        const transactionAmount = formatField('54', amount);
        const countryCode = '5802BR';
        const merchantNameFormatted = formatField('59', normalizeText(merchantName).substring(0, 25));
        const merchantCityFormatted = formatField('60', normalizeText(merchantCity).substring(0, 15));
        const additionalDataFormatted = formatField('62', formatField('05', txid));
        const payload = [payloadFormat, merchantAccountInfo, merchantCategoryCode, transactionCurrency, transactionAmount, countryCode, merchantNameFormatted, merchantCityFormatted, additionalDataFormatted].join('') + '6304';
        const checksum = crc16(payload);
        return payload + checksum;
    }
});