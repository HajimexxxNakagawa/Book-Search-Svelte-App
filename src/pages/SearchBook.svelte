<script lang="ts">
    import BookCard from '../components/BookCard.svelte'
    import SearchBar from '../components/SearchBar.svelte'
    import Spinner from '../components/Spinner.svelte'
    import RepositoryFactory, { BOOK } from '../repositories/RepositoryFactory'
    import { books } from '../store/book'
    import InfiniteScroll from "svelte-infinite-scroll"
    const BookRepository = RepositoryFactory[BOOK]
    
    let q = ''
    let empty = false
    let unSearched = true
    let promise: Promise<void>
    let startIndex = 0
    let totalItems = 0

    $: hasMore = totalItems > $books.length

    const handleSubmit = () => {
        unSearched = false
        if (!q.trim()) return
        promise = getBooks()
     }

     const searchToClick = (word)=>{
         q = word
         handleSubmit()
     }

    const getBooks = async () => {
        books.reset()
        empty = false
        startIndex = 0
        const result = await BookRepository.get({ q })
        empty = result.totalItems === 0
        totalItems = result.totalItems
        books.add(result.items)
    }

    const handleLoadMore = () => {
        startIndex += 10
        promise = getNextPage()
    }

    const getNextPage = async () => {
    const result = await BookRepository.get({ q, startIndex })

    // 取得データが既に存在するものを含む可能性があるので、idでフィルタリング
    const bookIds = $books.map(book => book.id)
    const filteredItems = result.items.filter(item => {
      return !bookIds.includes(item.id)
    })
    books.add(filteredItems)
  }
</script>
  
<form on:submit|preventDefault={handleSubmit}>
    <SearchBar bind:value={q} />
</form>
{#if unSearched}
    <ul class="flex justify-between text-blue-400 cursor-pointer m-3">
        <li on:click={()=>searchToClick("React")}>React</li>
        <li on:click={()=>searchToClick("TypeScript")}>TypeScript</li>
        <li on:click={()=>searchToClick("Vue")}>Vue</li>
        <li on:click={()=>searchToClick("Angular")}>Angular</li>
        <li on:click={()=>searchToClick("Svelte")}>Svelte</li>
    </ul>
{/if}
<div class="text-center mt-4">
    {#if empty}
      <div>検索結果が見つかりませんでした。</div>
    {:else}
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {#each $books as book (book.id)}
      <BookCard {book} />
      {/each}
    </div>
    <InfiniteScroll window threshold={100} on:loadMore={handleLoadMore} {hasMore} />
    {/if}
    {#await promise}
    <div class="flex justify-center">
        <Spinner />
    </div>  
      {:catch e}
        <span class="text-red-600 text-sm">
          {e.message}
        </span>
    {/await}
</div>