<script>
    import Input from "@lib/Input.svelte"
    import Button from "@lib/Button.svelte"

    import { userId } from '@/store.js';
    import { auth , db} from '@/firebase.js';
    import { addLog } from '@/logHandler.js'

    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    let nom
    let prenom
    let email
    let password

    async function register(email,password){
        try {
            if (!nom || !prenom || !email || !password){
                throw {code:"auth/missing-field"}
            }
            let userCredential = await auth.createUserWithEmailAndPassword(email, password)
            
            userId.set(userCredential.user.uid)


            db.collection("spe").doc(userCredential.user.uid).set({
                nom,
                prenom,
                email,
                isVerified : false,
                likes:[]
        })

        navigate('/spe')
        } catch (e) {
        switch (e.code) {
                case "auth/missing-field":
                    addLog("error","Il me manque des info !!! 😩")
                    break;

                case "auth/invalid-email":
                    addLog("error","Ton adresse mail n'est pas valide 😩")
                    
                    break;
                case "auth/email-already-in-use":
                    addLog("error","Il existe quelqu'un avec cette adresse mail 😩")
                    
                    break;
                case "auth/weak-password":
                    addLog("error","Ton mot de passe est trop simple 😩")
                    
                    break;
            }
        }   
    }

            function getTabStops(o, a, el) {

        if (el.tabIndex > 0) {
            if (o[el.tabIndex]) {
                o[el.tabIndex].push(el);
            } else {
                o[el.tabIndex] = [el];
            }
        } else if (el.tabIndex === 0) {
            // Tab index "0" comes last so we accumulate it seperately
            a.push(el);
        }
        // Check if children are tab stops
        for (var i = 0, l = el.children.length; i < l; i++) {
            getTabStops(o, a, el.children[i]);
        }
    };

    function focusNext() {
        var o = [],
            a = [],
            stops = [],
            active = document.activeElement;
        getTabStops(o, a, document.body);
        // Use simple loops for maximum browser support
        for (var i = 0, l = o.length; i < l; i++) {
            if (o[i]) {
                for (var j = 0, m = o[i].length; j < m; j++) {
                    stops.push(o[i][j]);
                }
            }
        }
        for (var i = 0, l = a.length; i < l; i++) {
            stops.push(a[i]);
        }
        // If no items are focusable, then blur
        if (stops.length === 0) {
            active.blur();
            return;
        }
        // Shortcut if current element is not focusable
        if (active.tabIndex < 0) {
            stops[0].focus();
            return;
        }
        // Attempt to find the current element in the stops
        for (var i = 0, l = stops.length; i < l; i++) {
            if (stops[i] === active) {
                if (i + 1 === stops.length) {
                    active.blur();
                    return;
                }
                stops[i+1].focus();
                return;
            }
        }
        // We shouldn't make it this far
        active.blur();
    };

    document.addEventListener('keypress', function (e) {
        if (e.key === "Enter" && !['TEXTAREA','BUTTON'].includes(e.target.tagName))  {
            e.preventDefault();
            focusNext();
        }
    });

</script>



<Input name="email" type="email" bind:value={email}>Email</Input>
<Input name="password" type="password" bind:value={password}>Mot de passe</Input>
<Input name="nom" bind:value={nom}>Nom</Input>
<Input name="prenom" bind:value={prenom}>Prénom</Input>


<Button on:click={() => register(email,password)}>S'enregistrer</Button>
<a href="/" on:click|preventDefault={() => navigate('/spe/login')}>J'ai deja un compte</a>

<style>
    a{
        text-align: center;
    }
</style>