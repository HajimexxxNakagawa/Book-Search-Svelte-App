<script lang="ts">
    import SearchBar from '../components/SearchBar.svelte'
    let q = 'JavaScript'
</script>
  
<SearchBar bind:value={q} />
<div class="text-center mt-4">
    { q }
</div>