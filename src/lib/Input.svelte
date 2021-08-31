<script>
    export let name = ""
    export let type = "text"
    export let choix = []
    export let value = ""

    const handleInput = e => {
    value = e.target.value;
  };
    const handleResize = e => {
    let elm = e.target

    var minRows = elm.getAttribute('data-min-rows')|2
    !elm._baseScrollHeight && getScrollHeight(elm)
            
    elm.rows = minRows
    let rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 19)
    elm.rows = minRows + rows
  };

  function getScrollHeight(elm){
  var savedValue = elm.value
  elm.value = ''
  elm._baseScrollHeight = elm.scrollHeight
  elm.value = savedValue
}
</script>


{#if type=="textarea"}
<label for="{name}"><slot></slot></label>

    <textarea name="{name || ""}" id="{name || ""}" bind:value on:input={handleResize} min-rows="2"></textarea>
{:else if type=="radio"}
<label for="{name}"><slot></slot></label>
<ul>
        {#each choix as possibilite, i}
        <li><input type="radio" bind:group={value} value={possibilite} {name} id="{name +  possibilite}"><label for="{name +  possibilite}">{possibilite}</label></li>
        {/each}
    </ul>
{:else}
<label for="{name}"><slot></slot></label>

    <input type={type} name="{name || ""}" id="{name || ""}" {value}  on:input={handleInput}>
    
{/if}

<style>
    input,textarea{
        border: 1px solid black;
        border-radius: .25rem;
        font-size: 1rem;
        padding: .25rem;
        margin: 0 0 1rem 0;
    }

    textarea{
        resize: none;
    }

    ul{
        margin: 0 0 1rem 2px;
        padding-left: .5rem;
        border-left: 2px solid #706FD3;
    }

    li{
        list-style: none;
    }

    input[type=radio]{
        margin: 0;
        margin-right:.25rem;
        opacity: 0;
    }

    input[type=radio] + label::before{
        content:"";
        position: absolute;
        left: -1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: white;
        box-shadow: inset 0px 0px 0px 2px #FFFFFF, 0px 0px 0px 2px #706FD3
    }

    input[type=radio]:checked + label::before{
        background-color: #706FD3;
    }

    input:focus,textarea:focus{
        outline: none;
        border: 1px solid #706fd3;
    }

    label{
        white-space: pre-wrap;
        position: relative;
    }
</style>