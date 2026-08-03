TRENDING_BENCHMARK = {
    "top_posts_to_benchmark": 3,
    "avg_word_count": 1700,
    "recommended_word_count": 1700,
    "avg_images": 4,
    "recommended_images": 4,
    "avg_sections": 5,
    "recommended_bullets_per_section": 3,
}


def build_naver_blog_section(heading, lead, bullets=None, takeaway=None):
    """네이버 블로그 소제목 단위 구조를 생성합니다."""
    if bullets is None:
        bullets = []

    return {
        "heading": heading,
        "lead": lead,
        "bullets": bullets,
        "takeaway": takeaway,
    }


def build_naver_blog_post(
    title,
    subtitle,
    summary,
    intro,
    sections,
    images=None,
    keywords=None,
    tags=None,
    cta=None,
    recommended_word_count=TRENDING_BENCHMARK["recommended_word_count"],
    recommended_image_count=TRENDING_BENCHMARK["recommended_images"],
):
    """네이버 블로그에 최적화된 글 구조를 생성합니다."""
    if images is None:
        images = []
    if keywords is None:
        keywords = []
    if tags is None:
        tags = []

    return {
        "title": title,
        "subtitle": subtitle,
        "summary": summary,
        "intro": intro,
        "sections": sections,
        "images": images,
        "recommended_image_count": recommended_image_count,
        "recommended_word_count": recommended_word_count,
        "keywords": keywords,
        "tags": tags,
        "cta": cta,
    }


def build_naver_blog_series(posts):
    """블로그 포스트 목록을 한 번에 생성합니다."""
    return [build_naver_blog_post(**post) for post in posts]


def benchmark_top_naver_posts():
    """상위 3개 네이버 블로그 구조 벤치마킹 정보."""
    return {
        "benchmark_source": "네이버 상위 3개 블로그",
        "word_count": TRENDING_BENCHMARK["avg_word_count"],
        "image_count": TRENDING_BENCHMARK["avg_images"],
        "sections": TRENDING_BENCHMARK["avg_sections"],
        "bullets_per_section": TRENDING_BENCHMARK["recommended_bullets_per_section"],
        "style": [
            "강조 문장 + 숫자형 소제목",
            "목차와 요약형 문장 구성",
            "관련 이미지 4장 이상 사용",
            "중간 중간 핵심 키워드와 CTA 배치",
        ],
    }


if __name__ == "__main__":
    sample_posts = [
        {
            "title": "2026 네이버 블로그 상위 노출 공식: 1일차",
            "subtitle": "트렌디한 제목과 요약으로 첫인상을 잡는 법",
            "summary": "상위 3개 블로그를 벤치마킹해 효과적인 제목, 요약, 키워드 배치를 설계합니다.",
            "intro": (
                "최근 네이버 검색 결과를 보면, '짧고 강한 제목 + 명확한 요약'이 클릭률을 높이고 있습니다. "
                "오늘은 내가 바로 적용할 수 있는 글 구성과 시각 요소를 함께 정리합니다."
            ),
            "sections": [
                build_naver_blog_section(
                    "1. 핵심 키워드 3가지 선정",
                    "주제와 검색 의도를 모두 담는 키워드를 먼저 정합니다.",
                    bullets=[
                        "검색량이 안정적이고 경쟁이 적은 롱테일 키워드 포함",
                        "제목, 요약, 본문 첫 문단에 자연스럽게 배치",
                        "네이버 자동완성/연관검색어를 참고해 표현 확장",
                    ],
                    takeaway="키워드가 명확하면 네이버 검색 결과에서 상위 노출 확률이 높아집니다.",
                ),
                build_naver_blog_section(
                    "2. 강한 서두와 클릭을 부르는 요약",
                    "첫 문단에서 내가 어떤 문제를 해결해 줄지 분명히 제시합니다.",
                    bullets=[
                        "문장 2~3개로 혜택과 결과를 바로 설명",
                        "'이 글을 읽으면', '이제부터' 같은 표현 사용",
                        "중요 키워드를 1회 이상 포함해 검색 신호 강화",
                    ],
                    takeaway="첫 문단이 명확하면 체류 시간이 높아지고 이탈률이 줄어듭니다.",
                ),
                build_naver_blog_section(
                    "3. 시각 요소 4장 이상 배치",
                    "사진, 차트, 인포그래픽을 활용해 머릿속에 빠르게 각인시킵니다.",
                    bullets=[
                        "대표 이미지 1장 + 내용 보조 이미지 3장 이상 권장",
                        "이미지 ALT에 키워드와 간단 설명 추가",
                        "시각적으로 정리된 리스트, 비교표, 단계별 흐름도 활용",
                    ],
                    takeaway="이미지는 모바일에서도 스크롤을 멈추게 하는 핵심 요소입니다.",
                ),
                build_naver_blog_section(
                    "4. 5개 이상 소제목으로 가독성 확보",
                    "짧은 문단과 명확한 소제목으로 모바일 사용자도 쉽게 읽을 수 있게 합니다.",
                    bullets=[
                        "각 소제목은 3~7단어로 핵심을 담기",
                        "문단 길이는 2~4줄 이내로 유지",
                        "중간중간 강조 문장과 이모지(적절히) 사용",
                    ],
                    takeaway="가독성이 높으면 체류 시간이 길어지고 검색 알고리즘에 긍정적으로 반영됩니다.",
                ),
                build_naver_blog_section(
                    "5. 마무리에서 행동 유도",
                    "결론과 함께 다음 행동을 자연스럽게 연결합니다.",
                    bullets=[
                        "핵심 내용을 한 문장으로 다시 정리",
                        "댓글, 좋아요, 내 블로그 다른 글로 이동 유도",
                        "다음 글 제목이나 관련 포스트 링크 함께 제공",
                    ],
                    takeaway="좋은 마무리는 독자의 참여와 재방문을 높입니다.",
                ),
            ],
            "images": [
                "/images/hero-banner.png",
                "/images/keyword-layout.png",
                "/images/visual-checklist.png",
                "/images/cta-banner.png",
            ],
            "keywords": ["네이버 블로그", "상위 노출", "블로그 글쓰기"],
            "tags": ["네이버SEO", "블로그작업", "콘텐츠전략"],
            "cta": "이 구조를 따라 오늘 글을 작성해보세요.",
        },
        {
            "title": "2026 네이버 블로그 상위 노출 공식: 2일차",
            "subtitle": "콘텐츠 퀄리티를 높이는 본문 구성과 서술법",
            "summary": "검색 상위 글의 공통 패턴을 활용한 실전 본문 작성 전략입니다.",
            "intro": (
                "상위 노출 글은 단순히 길기만 한 글이 아닙니다. "
                "논리 흐름과 가치 제공, 시각 피드백이 뛰어난 글이 더 잘 작동합니다."
            ),
            "sections": [
                build_naver_blog_section(
                    "1. 문제 제기 → 해결 제안 순으로 구성",
                    "독자가 공감할 수 있는 문제를 먼저 제시하고 해결 방향을 보여줍니다.",
                    bullets=[
                        "현실적인 상황 예시를 넣어 공감 요소 강화",
                        "‘왜 지금 이 글을 읽어야 하는가’를 분명히 설명",
                        "해결책을 3단계로 정리해 설득력 높이기",
                    ],
                    takeaway="명확한 흐름은 독자를 끝까지 끌어들이는 힘이 있습니다.",
                ),
                build_naver_blog_section(
                    "2. 체크리스트 형태로 핵심을 정리",
                    "중요 정보는 리스트나 표로 정리해 빠르게 이해시키세요.",
                    bullets=[
                        "3~5개 핵심 포인트를 먼저 나열",
                        "각 포인트에 짧은 설명과 예시 추가",
                        "관련 키워드를 노출시키되 자연스럽게 연결",
                    ],
                    takeaway="핵심 포인트는 검색 로봇과 사용자 모두에게 가치를 전달합니다.",
                ),
                build_naver_blog_section(
                    "3. 실제 예시와 사용 후기 삽입",
                    "믿을 수 있는 근거를 전달하면 글의 신뢰도가 올라갑니다.",
                    bullets=[
                        "성공 사례, 비교 데이터, 사용자 후기를 함께 배치",
                        "소제목 아래에 짧은 인용문을 넣어 시각적 포인트 추가",
                        "도표나 비교표로 정보를 정리하면 전달력이 올라갑니다.",
                    ],
                    takeaway="실제 사례는 독자가 내용을 내 일처럼 받아들이게 합니다.",
                ),
            ],
            "images": [
                "/images/content-flow.png",
                "/images/checklist-example.png",
                "/images/user-review.png",
            ],
            "keywords": ["본문 구성", "가독성", "상위노출"],
            "tags": ["콘텐츠전략", "사용자경험", "글쓰기팁"],
            "cta": "이제 나만의 글에 적용해 상위 노출을 준비하세요.",
        },
        {
            "title": "2026 네이버 블로그 상위 노출 공식: 3일차",
            "subtitle": "작성 후 점검과 수정으로 완성도를 높이는 방법",
            "summary": "상위 3개 블로그는 작성 후 검토 과정을 철저히 거쳐 글 성과를 개선합니다.",
            "intro": (
                "좋은 글은 한 번에 완성되지 않습니다. 검토, 수정, 재배치로 최적화가 이루어집니다. "
                "특히 네이버 검색은 지속적인 업데이트와 개선을 선호합니다."
            ),
            "sections": [
                build_naver_blog_section(
                    "1. 제목/요약/소제목 재검토",
                    "첫 인상이 바뀌면 검색 클릭률도 달라집니다.",
                    bullets=[
                        "핵심 키워드가 앞쪽에 들어갔는지 확인",
                        "문장이 너무 길지 않은지, 읽기 쉬운지 점검",
                        "소제목마다 독립적인 의미가 있는지 검토",
                    ],
                    takeaway="첫 화면에 보이는 요소가 경쟁력을 결정합니다.",
                ),
                build_naver_blog_section(
                    "2. 이미지 ALT와 설명 보강",
                    "이미지도 검색 신호가 되므로 텍스트 정보를 충분히 제공합니다.",
                    bullets=[
                        "이미지 파일 이름과 ALT에 키워드 반영",
                        "각 이미지에 짧은 설명을 붙여 컨텍스트 제공",
                        "필요 시 GIF, 차트, 콘텐츠 요약 이미지를 추가",
                    ],
                    takeaway="이미지를 제대로 활용하면 네이버 AI가 내용을 더 잘 이해합니다.",
                ),
                build_naver_blog_section(
                    "3. 내부 링크와 외부 링크 연결",
                    "관련 글과 연결하면 체류 시간과 페이지 가치가 모두 올라갑니다.",
                    bullets=[
                        "관련 주제 2~3개 글을 자연스럽게 연결",
                        "공식 자료나 신뢰할 수 있는 출처 링크 추가",
                        "댓글 유도 문장을 마무리에 한 번 더 배치",
                    ],
                    takeaway="링크 전략은 검색 최적화에서 빠르게 반영되는 요소입니다.",
                ),
            ],
            "images": [
                "/images/edit-checklist.png",
                "/images/alt-text.png",
                "/images/internal-links.png",
            ],
            "keywords": ["글 검토", "네이버 블로그 개선", "상위 노출 체크리스트"],
            "tags": ["검수", "SEO개선", "네이버블로그"],
            "cta": "작성 후 꼭 3회 이상 검토하며 완성도를 높여보세요.",
        },
    ]

    series = build_naver_blog_series(sample_posts)
    benchmark = benchmark_top_naver_posts()

    print("벤치마크 정보:")
    print(benchmark)
    print()

    for index, post in enumerate(series, start=1):
        print(f"===== 블로그 포스트 {index} =====")
        print(post)
        print()
