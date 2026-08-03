const sectionsContainer = document.getElementById('sections');
const generateButton = document.getElementById('generate');
const loadExampleButton = document.getElementById('loadExample');
const previewTabButtons = document.querySelectorAll('[data-tab]');
const previewPanel = document.getElementById('preview');
const markdownPanel = document.getElementById('markdown');

const defaultSectionCount = 5;
const sampleSections = [
  {
    heading: '1. 핵심 키워드 3가지 선정',
    lead: '주제와 검색 의도를 모두 담는 키워드를 먼저 정합니다.',
    bullets: '검색량이 안정적이고 경쟁이 적은 롱테일 키워드 포함,제목과 요약, 본문 첫 문단에 자연스럽게 배치,네이버 자동완성/연관검색어를 참고해 표현 확장',
    takeaway: '키워드가 명확하면 네이버 검색 결과에서 상위 노출 확률이 높아집니다.',
  },
  {
    heading: '2. 강한 서두와 클릭을 부르는 요약',
    lead: '첫 문단에서 내가 어떤 문제를 해결해 줄지 분명히 제시합니다.',
    bullets: '문장 2~3개로 혜택과 결과를 바로 설명,이 글을 읽으면, 이제부터 같은 표현 사용,중요 키워드를 1회 이상 포함해 검색 신호 강화',
    takeaway: '첫 문단이 명확하면 체류 시간이 높아지고 이탈률이 줄어듭니다.',
  },
  {
    heading: '3. 시각 요소 4장 이상 배치',
    lead: '사진, 차트, 인포그래픽을 활용해 머릿속에 빠르게 각인시킵니다.',
    bullets: '대표 이미지 1장 + 내용 보조 이미지 3장 이상 권장,이미지 ALT에 키워드와 간단 설명 추가,시각적으로 정리된 리스트, 비교표, 단계별 흐름도 활용',
    takeaway: '이미지는 모바일에서도 스크롤을 멈추게 하는 핵심 요소입니다.',
  },
  {
    heading: '4. 5개 이상 소제목으로 가독성 확보',
    lead: '짧은 문단과 명확한 소제목으로 모바일 사용자도 쉽게 읽을 수 있게 합니다.',
    bullets: '각 소제목은 3~7단어로 핵심을 담기,문단 길이는 2~4줄 이내로 유지,중간중간 강조 문장과 이모지(적절히) 사용',
    takeaway: '가독성이 높으면 체류 시간이 길어지고 검색 알고리즘에 긍정적으로 반영됩니다.',
  },
  {
    heading: '5. 마무리에서 행동 유도',
    lead: '결론과 함께 다음 행동을 자연스럽게 연결합니다.',
    bullets: '핵심 내용을 한 문장으로 다시 정리,댓글, 좋아요, 내 블로그 다른 글로 이동 유도,다음 글 제목이나 관련 포스트 링크 함께 제공',
    takeaway: '좋은 마무리는 독자의 참여와 재방문을 높입니다.',
  },
];

function createSectionCard(section = {}, index) {
  const sectionBlock = document.createElement('div');
  sectionBlock.className = 'section-block';

  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = `섹션 ${index + 1}`;

  const sectionFields = document.createElement('div');
  sectionFields.className = 'section-fields';

  sectionFields.innerHTML = `
    <div class="field-row">
      <label>소제목</label>
      <input class="section-heading" value="${section.heading || ''}" placeholder="숫자형 소제목을 입력하세요" />
    </div>
    <div class="field-row">
      <label>리드 문장</label>
      <textarea class="section-lead" rows="2" placeholder="소제목을 보충하는 한 문장"></textarea>
    </div>
    <div class="field-row">
      <label>핵심 포인트 (쉼표로 구분)</label>
      <textarea class="section-bullets" rows="2" placeholder="핵심 포인트를 쉼표로 구분합니다"></textarea>
    </div>
    <div class="field-row">
      <label>Takeaway</label>
      <input class="section-takeaway" placeholder="이 섹션의 핵심 메시지" />
    </div>
  `;

  sectionBlock.appendChild(sectionTitle);
  sectionBlock.appendChild(sectionFields);

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'button removeSection';
  removeButton.textContent = '섹션 제거';
  removeButton.addEventListener('click', () => {
    sectionsContainer.removeChild(sectionBlock);
    refreshSectionHeaders();
  });

  sectionBlock.appendChild(removeButton);
  sectionsContainer.appendChild(sectionBlock);

  sectionBlock.querySelector('.section-lead').value = section.lead || '';
  sectionBlock.querySelector('.section-bullets').value = section.bullets || '';
  sectionBlock.querySelector('.section-takeaway').value = section.takeaway || '';

  return sectionBlock;
}

function refreshSectionHeaders() {
  document.querySelectorAll('.section-block').forEach((block, index) => {
    block.querySelector('h3').textContent = `섹션 ${index + 1}`;
  });
}

function addSection(section) {
  createSectionCard(section, sectionsContainer.children.length);
}

function getFormValue(id) {
  return document.getElementById(id).value.trim();
}

function parseList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildSectionsFromForm() {
  return Array.from(document.querySelectorAll('.section-block')).map((block) => {
    return {
      heading: block.querySelector('.section-heading').value.trim(),
      lead: block.querySelector('.section-lead').value.trim(),
      bullets: parseList(block.querySelector('.section-bullets').value),
      takeaway: block.querySelector('.section-takeaway').value.trim(),
    };
  });
}

function generateMarkdown(post) {
  const bulletsMarkdown = (bullets) => bullets.map((item) => `- ${item}`).join('\n');

  const sectionsMd = post.sections
    .map(
      (section) =>
        `### ${section.heading}\n${section.lead}\n\n${bulletsMarkdown(section.bullets)}\n\n**Takeaway:** ${section.takeaway}`
    )
    .join('\n\n');

  return `# ${post.title}\n\n**${post.subtitle}**\n\n${post.summary}\n\n${post.intro}\n\n${sectionsMd}\n\n---\n\n**키워드:** ${post.keywords.join(', ')}\n**태그:** ${post.tags.join(', ')}\n**이미지 URL:** ${post.images.join(', ')}\n\n**추천 CTA:** ${post.cta}`;
}

function renderPreview(post) {
  const imageList = post.images.map((src) => `<li>${src}</li>`).join('');
  const sectionBlocks = post.sections
    .map(
      (section) => `
      <div class="section-block">
        <h3>${section.heading}</h3>
        <p><strong>${section.lead}</strong></p>
        <ul>${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>
        <p><em>${section.takeaway}</em></p>
      </div>`
    )
    .join('');

  return `
    <div class="preview-card">
      <h2>${post.title}</h2>
      <p><strong>${post.subtitle}</strong></p>
      <p>${post.summary}</p>
      <p>${post.intro}</p>
      ${sectionBlocks}
      <p><strong>키워드:</strong> ${post.keywords.join(', ')}</p>
      <p><strong>태그:</strong> ${post.tags.join(', ')}</p>
      <p><strong>이미지 URL:</strong></p>
      <ul>${imageList}</ul>
      <p><strong>추천 CTA:</strong> ${post.cta}</p>
    </div>
  `;
}

function generatePost() {
  const post = {
    title: getFormValue('title'),
    subtitle: getFormValue('subtitle'),
    summary: getFormValue('summary'),
    intro: getFormValue('intro'),
    images: parseList(getFormValue('images')),
    keywords: parseList(getFormValue('keywords')),
    tags: parseList(getFormValue('tags')),
    cta: getFormValue('cta'),
    sections: buildSectionsFromForm(),
  };

  previewPanel.innerHTML = renderPreview(post);
  markdownPanel.textContent = generateMarkdown(post);
  updateWordCountAndWarnings(markdownPanel.textContent, post.images);
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {
    alert('클립보드 API를 지원하지 않는 브라우저입니다.');
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => alert('Markdown이 클립보드에 복사되었습니다.'),
    (err) => alert('복사 실패: ' + err)
  );
}

function exportMarkdownFile(filename, text) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Templates stored in localStorage under key 'bwa_templates'
function saveTemplateToStorage(name, post) {
  if (!name) return alert('템플릿 이름을 입력하세요.');
  const raw = localStorage.getItem('bwa_templates');
  const arr = raw ? JSON.parse(raw) : [];
  arr.push({ name, post });
  localStorage.setItem('bwa_templates', JSON.stringify(arr));
  loadTemplatesUI();
  alert('템플릿이 저장되었습니다.');
}

function loadTemplatesUI() {
  const sel = document.getElementById('templateList');
  sel.innerHTML = '';
  const raw = localStorage.getItem('bwa_templates');
  const arr = raw ? JSON.parse(raw) : [];
  if (arr.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '저장된 템플릿 없음';
    sel.appendChild(opt);
    return;
  }
  const empty = document.createElement('option');
  empty.value = '';
  empty.textContent = '템플릿 선택...';
  sel.appendChild(empty);
  arr.forEach((t, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = t.name;
    sel.appendChild(opt);
  });
}

function loadTemplateFromStorage(index) {
  const raw = localStorage.getItem('bwa_templates');
  const arr = raw ? JSON.parse(raw) : [];
  if (!arr || !arr[index]) return alert('선택한 템플릿을 불러올 수 없습니다.');
  const post = arr[index].post;
  // populate form
  document.getElementById('title').value = post.title || '';
  document.getElementById('subtitle').value = post.subtitle || '';
  document.getElementById('summary').value = post.summary || '';
  document.getElementById('intro').value = post.intro || '';
  document.getElementById('keywords').value = (post.keywords || []).join(', ');
  document.getElementById('tags').value = (post.tags || []).join(', ');
  document.getElementById('cta').value = post.cta || '';
  document.getElementById('images').value = (post.images || []).join(', ');
  sectionsContainer.innerHTML = '';
  (post.sections || []).forEach((s) => addSection(s));
  generatePost();
}

function estimateWordCount(md) {
  if (!md) return 0;
  const words = md.replace(/[^\w\s가-힣]/g, ' ').trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function updateWordCountAndWarnings(md, images) {
  const wc = estimateWordCount(md);
  const wcElem = document.getElementById('wordCount');
  wcElem.textContent = `권장 단어수: 1700 · 현재 추정 단어수: ${wc}`;
  const imgWarn = document.getElementById('imageWarning');
  const imgCount = images ? images.length : 0;
  if (imgCount < 4) {
    imgWarn.textContent = `권장 이미지 수는 4개 이상입니다. 현재 이미지 수: ${imgCount}`;
  } else {
    imgWarn.textContent = '';
  }
}

function setActiveTab(tabName) {
  previewTabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });
  previewPanel.classList.toggle('active', tabName === 'preview');
  markdownPanel.classList.toggle('active', tabName === 'markdown');
}

function loadExample() {
  document.getElementById('title').value = '2026 네이버 블로그 상위 노출 공식';
  document.getElementById('subtitle').value = '트렌디한 제목과 요약 작성법';
  document.getElementById('summary').value = '상위 3개 블로그를 벤치마킹해 효과적인 제목, 요약, 키워드 배치를 설계합니다.';
  document.getElementById('intro').value = '최근 네이버 검색 결과를 보면, 짧고 강한 제목과 명확한 요약이 클릭률을 높입니다. 오늘은 바로 적용할 수 있는 글 구성과 시각 요소를 정리합니다.';
  document.getElementById('keywords').value = '네이버 블로그, 상위 노출, 블로그 글쓰기';
  document.getElementById('tags').value = '네이버SEO, 콘텐츠전략, 글쓰기팁';
  document.getElementById('cta').value = '이제 바로 내 글을 작성해보세요.';
  document.getElementById('images').value = '/images/hero-banner.png, /images/keyword-layout.png, /images/visual-checklist.png, /images/cta-banner.png';
  sectionsContainer.innerHTML = '';
  sampleSections.forEach((section) => addSection(section));
}

function init() {
  for (let i = 0; i < defaultSectionCount; i += 1) {
    addSection(sampleSections[i] || {});
  }

  generateButton.addEventListener('click', generatePost);
  loadExampleButton.addEventListener('click', loadExample);
  document.getElementById('copyMarkdown').addEventListener('click', () => copyToClipboard(markdownPanel.textContent));
  document.getElementById('exportMarkdown').addEventListener('click', () => exportMarkdownFile('blog-post.md', markdownPanel.textContent));
  document.getElementById('saveTemplate').addEventListener('click', () => {
    const name = prompt('템플릿 이름을 입력하세요:');
    if (!name) return;
    const post = {
      title: getFormValue('title'),
      subtitle: getFormValue('subtitle'),
      summary: getFormValue('summary'),
      intro: getFormValue('intro'),
      images: parseList(getFormValue('images')),
      keywords: parseList(getFormValue('keywords')),
      tags: parseList(getFormValue('tags')),
      cta: getFormValue('cta'),
      sections: buildSectionsFromForm(),
    };
    saveTemplateToStorage(name, post);
  });
  document.getElementById('loadTemplate').addEventListener('click', () => {
    const sel = document.getElementById('templateList');
    if (!sel.value) return alert('템플릿을 선택하세요.');
    loadTemplateFromStorage(Number(sel.value));
  });
  loadTemplatesUI();
  previewTabButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab));
  });

  document.getElementById('addSection').addEventListener('click', () => addSection({}));
  setActiveTab('preview');
  loadExample();
}

init();
